"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
var GET = request_1.Request.GET;
var POST = request_1.Request.POST;
var Runtime;
(function (Runtime) {
    async function getSessionId() {
        return await GET('/session');
    }
    Runtime.getSessionId = getSessionId;
    async function popData(uuid) {
        assertTruthy('Uuid', uuid);
        return await GET('/popdata', { uuid: uuid });
    }
    Runtime.popData = popData;
    async function startSuite(uuid, name, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Timestamp', timestamp);
        assertTruthy('Suite name', name);
        return await POST('/startsuite', { uuid: uuid, name: name, timestamp: timestamp });
    }
    Runtime.startSuite = startSuite;
    async function endSuite(uuid, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endsuite', { uuid: uuid, timestamp: timestamp });
    }
    Runtime.endSuite = endSuite;
    async function startTest(uuid, name, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Test name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/starttest', { uuid: uuid, name: name, timestamp: timestamp });
    }
    Runtime.startTest = startTest;
    async function endTest(uuid, status, error, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return error
            ? await POST('/endtest', {
                status: status,
                error: JSON.stringify({ uuid: uuid, message: error.message, stackTrace: error.stack }),
                timestamp: timestamp
            })
            : await POST('/endtest', { uuid: uuid, status: status, timestamp: timestamp });
    }
    Runtime.endTest = endTest;
    async function startStep(uuid, name, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Step name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/startstep', { uuid: uuid, name: name, timestamp: timestamp });
    }
    Runtime.startStep = startStep;
    async function endStep(uuid, status, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endstep', { uuid: uuid, status: status, timestamp: timestamp });
    }
    Runtime.endStep = endStep;
    async function setDescription(uuid, type, content) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Content', content);
        assertTruthy('Type', type);
        return await POST('/description', { uuid: uuid, content: content, type: type });
    }
    Runtime.setDescription = setDescription;
    async function addAttachment(uuid, title, content) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Name', title);
        assertTruthy('Content', content);
        return await POST('/attachment', {
            uuid: uuid,
            title: title,
            attachment: content['mime'] ? {
                value: content['buffer'],
                options: {
                    filename: 'NONE',
                    contentType: content['mime']
                }
            } : content
        });
    }
    Runtime.addAttachment = addAttachment;
    async function addLabel(uuid, name, value) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', { uuid: uuid, name: name, value: value });
    }
    Runtime.addLabel = addLabel;
    async function addParameter(uuid, kind, name, value) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Kind', kind);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', { uuid: uuid, kind: kind, name: name, value: value });
    }
    Runtime.addParameter = addParameter;
    function assertTruthy(name, value) {
        if (!value) {
            throw new Error(`${name} should be truthy, but was '${value}'`);
        }
    }
})(Runtime = exports.Runtime || (exports.Runtime = {}));
//# sourceMappingURL=runtime.js.map