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


export class TestRun {
    private readonly session_id: string;
    private readonly test_run_id: string;

    private constructor(session_id: string, test_run_id: string) {
        this.session_id = session_id;
        this.test_run_id = test_run_id;
    }

    public static async create(session_id?: string): Promise<TestRun> {
        const b = await Runtime.getNewId().then(response => response.body);
        console.log(b);
        return new TestRun(
            session_id ? session_id : await Runtime.getNewId().then(response => response.body),
            await Runtime.getNewId().then(response => response.body)
        );
    }

    async startSuite(name: string, timestamp = Date.now()) {
        return await Runtime.startSuite(this.session_id, this.test_run_id, name, timestamp).then(response => response.body);
    }

    async endSuite(timestamp = Date.now()) {
        return await Runtime.endSuite(this.session_id, this.test_run_id, timestamp).then(response => response.body);
    }

    async startTest(name: string, timestamp = Date.now()) {
        return await Runtime.startTest(this.session_id, this.test_run_id, name, timestamp).then(response => response.body);
    }

    async endTest(status: 'broken' | 'failed' | 'passed' | 'skipped', error?: Error, timestamp = Date.now()) {
        return await Runtime.endTest(this.session_id, this.test_run_id, status, error ? error : null, timestamp).then(response => response.body);
    }

    async startStep(name: string, timestamp = Date.now()) {
        return await Runtime.startStep(this.session_id, this.test_run_id, name, timestamp).then(response => response.body);
    }

    async endStep(status: 'failed' | 'passed', timestamp = Date.now()) {
        return await Runtime.endStep(this.session_id, this.test_run_id, status, timestamp).then(response => response.body);
    }

    async setDescription(type: 'text' | 'html' | 'markdown', content: string) {
        return await Runtime.setDescription(this.session_id, this.test_run_id, type, content).then(response => response.body);
    }

    async addAttachment(title: string, content: ReadStream | { mime: string, buffer: Buffer }) {
        return await Runtime.addAttachment(this.session_id, this.test_run_id, title, content).then(response => response.body);
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
        return await Runtime.addLabel(this.session_id, this.test_run_id, name, value).then(response => response.body);
    }

    async addEnvironment(name: string, value: string) {
        return await Runtime.addParameter(this.session_id, this.test_run_id, 'environment-variable', name, value).then(response => response.body);
    }

    async addArgument(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.session_id, this.test_run_id, 'argument', name, value).then(response => response.body);
    }

    async addParameter(kind: string, name: string, value: string) {
        return await Runtime.addParameter(this.session_id, this.test_run_id, kind, name, value).then(response => response.body);
    }

    async writeToXML() {
        const data = JSON.parse(await this.popData());
        const suites = data.suites;
        suites.forEach(suite => {
            fs.outputFileSync(path.join(Configuration.baseDir, uuid.v4() + '-testsuite.xml'), xml.parse('ns2:test-suite', new Suite(suite).toXML()));
        });
    }

    private async popData() {
        return await Runtime.popData(this.test_run_id).then(response => response.body);
    }

}