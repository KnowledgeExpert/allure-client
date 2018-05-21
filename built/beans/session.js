"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("../runtime");
const xml = require("js2xmlparser");
const path = require("path");
const fs = require("fs-extra");
const uuid = require("uuid");
const suite_1 = require("./suite");
const configuration_1 = require("../configuration");
class Session {
    constructor(uuid) {
        this.uuid = uuid;
    }
    static async create() {
        return new Session(await runtime_1.Runtime.getSessionId().then(response => response.body));
    }
    async startSuite(name, timestamp = Date.now()) {
        return await runtime_1.Runtime.startSuite(this.uuid, name, timestamp).then(response => response.body);
    }
    async endSuite(timestamp = Date.now()) {
        return await runtime_1.Runtime.endSuite(this.uuid, timestamp).then(response => response.body);
    }
    async startTest(name, timestamp = Date.now()) {
        return await runtime_1.Runtime.startTest(this.uuid, name, timestamp).then(response => response.body);
    }
    async endTest(status, error, timestamp = Date.now()) {
        return await runtime_1.Runtime.endTest(this.uuid, status, error ? error : null, timestamp).then(response => response.body);
    }
    async startStep(name, timestamp = Date.now()) {
        return await runtime_1.Runtime.startStep(this.uuid, name, timestamp).then(response => response.body);
    }
    async endStep(status, timestamp = Date.now()) {
        return await runtime_1.Runtime.endStep(this.uuid, status, timestamp).then(response => response.body);
    }
    async setDescription(type, content) {
        return await runtime_1.Runtime.setDescription(this.uuid, type, content).then(response => response.body);
    }
    async addAttachment(title, content) {
        return await runtime_1.Runtime.addAttachment(this.uuid, title, content).then(response => response.body);
    }
    async setSeverity(severity) {
        return await this.addLabel('severity', severity).then(response => response.body);
    }
    async addEpic(epic) {
        return await this.addLabel('epic', epic).then(response => response.body);
    }
    async addStory(story) {
        return await this.addLabel('story', story).then(response => response.body);
    }
    async addFeature(feature) {
        return await this.addLabel('feature', feature).then(response => response.body);
    }
    async addLabel(name, value) {
        return await runtime_1.Runtime.addLabel(this.uuid, name, value).then(response => response.body);
    }
    async addEnvironment(name, value) {
        return await runtime_1.Runtime.addParameter(this.uuid, 'environment-variable', name, value).then(response => response.body);
    }
    async addArgument(kind, name, value) {
        return await runtime_1.Runtime.addParameter(this.uuid, 'argument', name, value).then(response => response.body);
    }
    async addParameter(kind, name, value) {
        return await runtime_1.Runtime.addParameter(this.uuid, kind, name, value).then(response => response.body);
    }
    async writeToXML() {
        const data = JSON.parse(await this.popData());
        const suites = data.suites;
        suites.forEach(suite => {
            fs.outputFileSync(path.join(configuration_1.Configuration.baseDir, uuid.v4() + '-testsuite.xml'), xml.parse('ns2:test-suite', new suite_1.Suite(suite).toXML()));
        });
    }
    async popData() {
        return await runtime_1.Runtime.popData(this.uuid).then(response => response.body);
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map