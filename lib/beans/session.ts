// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Runtime} from "../runtime";
import * as xml from "js2xmlparser";
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs-extra";
import {Suite} from "./suite";
import {Configuration} from "../configuration";
import {ReadStream} from "fs";


export class Session {
    private readonly uuid: string;

    private constructor(uuid: string) {
        this.uuid = uuid;
    }

    public static async create(uuid?: string): Promise<Session> {
        return new Session(uuid ? uuid : await Runtime.getSessionId().then(response => response.body));
    }

    async startSuite(name: string, timestamp = Date.now()) {
        return await Runtime.startSuite(this.uuid, name, timestamp).then(response => response.body);
    }

    async endSuite(timestamp = Date.now()) {
        return await Runtime.endSuite(this.uuid, timestamp).then(response => response.body);
    }

    async startTest(name: string, timestamp = Date.now()) {
        return await Runtime.startTest(this.uuid, name, timestamp).then(response => response.body);
    }

    async endTest(status: 'broken' | 'failed' | 'passed' | 'skipped', error?: Error, timestamp = Date.now()) {
        return await Runtime.endTest(this.uuid, status, error ? error : null, timestamp).then(response => response.body);
    }

    async startStep(name: string, timestamp = Date.now()) {
        return await Runtime.startStep(this.uuid, name, timestamp).then(response => response.body);
    }

    async endStep(status: 'failed' | 'passed', timestamp = Date.now()) {
        return await Runtime.endStep(this.uuid, status, timestamp).then(response => response.body);
    }

    async setDescription(type: 'text' | 'html' | 'markdown', content: string) {
        return await Runtime.setDescription(this.uuid, type, content).then(response => response.body);
    }

    async addAttachment(title: string, content: ReadStream | { mime: string, buffer: Buffer }) {
        return await Runtime.addAttachment(this.uuid, title, content).then(response => response.body);
    }

    async setSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
        return await this.addLabel('severity', severity).then(response => response.body);
    }

    async addEpic(epic: string) {
        return await this.addLabel('epic', epic).then(response => response.body);
    }

    async addStory(story: string) {
        return await this.addLabel('story', story).then(response => response.body);
    }

    async addFeature(feature: string) {
        return await this.addLabel('feature', feature).then(response => response.body);
    }

    async addLabel(name: string, value: string) {
        return await Runtime.addLabel(this.uuid, name, value).then(response => response.body);
    }

    async addEnvironment(name: string, value: string) {
        return await Runtime.addParameter(this.uuid, 'environment-variable', name, value).then(response => response.body);
    }

    async addArgument(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.uuid, 'argument', name, value).then(response => response.body);
    }

    async addParameter(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.uuid, kind, name, value).then(response => response.body);
    }

    async writeToXML() {
        const data = JSON.parse(await this.popData());
        const suites = data.suites;
        suites.forEach(suite => {
            fs.outputFileSync(path.join(Configuration.baseDir, uuid.v4() + '-testsuite.xml'), xml.parse('ns2:test-suite', new Suite(suite).toXML()));
        });
    }

    private async popData() {
        return await Runtime.popData(this.uuid).then(response => response.body);
    }

}