import {Runtime} from "../runtime";
import * as xml from "js2xmlparser";
import * as path from "path";
import * as fs from "fs-extra";
import * as uuid from "uuid";
import {Suite} from "./suite";
import {Configuration} from "../configuration";


export class Session {
    private readonly uuid: string;

    private constructor(uuid: string) {
        this.uuid = uuid;
    }

    public static async create(): Promise<Session> {
        const sessionIdResponse = await Runtime.getSessionId();
        return new Session(sessionIdResponse.body);
    }

    async startSuite(name: string, timestamp = Date.now()) {
        return await Runtime.startSuite(this.uuid, name, timestamp);
    }

    async endSuite(timestamp = Date.now()) {
        return await Runtime.endSuite(this.uuid, timestamp);
    }

    async startTest(name: string, timestamp = Date.now()) {
        return await Runtime.startTest(this.uuid, name, timestamp);
    }

    async endTest(status: 'broken' | 'failed' | 'passed' | 'skipped', error?: Error, timestamp = Date.now()) {
        return await Runtime.endTest(this.uuid, status, error ? error : null, timestamp);
    }

    async startStep(name: string, timestamp = Date.now()) {
        return await Runtime.startStep(this.uuid, name, timestamp);
    }

    async endStep(status: 'failed' | 'passed', timestamp = Date.now()) {
        return await Runtime.endStep(this.uuid, status, timestamp);
    }

    async setDescription(type: 'text' | 'text' | 'markdown', content: string) {
        return await Runtime.addDescription(this.uuid, type, content);
    }

    async addAttachment(name: string, mime: string, content: string | Buffer) {
        return await Runtime.addAttachment(this.uuid, name, mime, content);
    }

    async setSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
        return await this.addLabel('severity', severity);
    }

    async addEpic(epic: string) {
        return await this.addLabel('epic', epic);
    }

    async addStory(story: string) {
        return await this.addLabel('story', story);
    }

    async addFeature(feature: string) {
        return await this.addLabel('feature', feature);
    }

    async addLabel(name: string, value: string) {
        return await Runtime.addLabel(this.uuid, name, value);
    }

    async addEnvironment(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.uuid, 'environment-variable', name, value);
    }

    async addArgument(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.uuid, 'argument', name, value);
    }

    async addParameter(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.uuid, kind, name, value);
    }

    async writeToXML() {
        const data = await this.popData();
        const body = JSON.parse(data.body);
        const suites = body.suites;
        console.log(JSON.stringify(body, null, 3));

        suites.forEach(suite => {
            fs.outputFileSync(path.join(Configuration.baseDir, uuid.v4() + '-testsuite.xml'), xml.parse('ns2:test-suite', new Suite(suite).toXML()));
        });
    }

    private async popData() {
        return await Runtime.popData(this.uuid);
    }

}