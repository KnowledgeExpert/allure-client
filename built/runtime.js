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
    async function getNewId() {
        return await GET('/newid');
    }
    Runtime.getNewId = getNewId;
    async function popData(session_id) {
        assertTruthy('Uuid', session_id);
        return await GET('/popdata', { session_id: session_id });
    }
    Runtime.popData = popData;
    async function startSuite(session_id, test_run_id, name, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Timestamp', timestamp);
        assertTruthy('Suite name', name);
        return await POST('/startsuite', { session_id: session_id, test_run_id: test_run_id, name: name, timestamp: timestamp });
    }
    Runtime.startSuite = startSuite;
    async function endSuite(session_id, test_run_id, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endsuite', { session_id: session_id, test_run_id: test_run_id, timestamp: timestamp });
    }
    Runtime.endSuite = endSuite;
    async function startTest(session_id, test_run_id, name, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Test name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/starttest', { session_id: session_id, test_run_id: test_run_id, name: name, timestamp: timestamp });
    }
    Runtime.startTest = startTest;
    async function endTest(session_id, test_run_id, status, error, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return error
            ? await POST('/endtest', {
                status: status,
                error: JSON.stringify({ session_id: session_id, test_run_id: test_run_id, message: error.message, stackTrace: error.stack }),
                timestamp: timestamp
            })
            : await POST('/endtest', { session_id: session_id, test_run_id: test_run_id, status: status, timestamp: timestamp });
    }
    Runtime.endTest = endTest;
    async function startStep(session_id, test_run_id, name, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Step name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/startstep', { session_id: session_id, test_run_id: test_run_id, name: name, timestamp: timestamp });
    }
    Runtime.startStep = startStep;
    async function endStep(session_id, test_run_id, status, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endstep', { session_id: session_id, test_run_id: test_run_id, status: status, timestamp: timestamp });
    }
    Runtime.endStep = endStep;
    async function setDescription(session_id, test_run_id, type, content) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Content', content);
        assertTruthy('Type', type);
        return await POST('/description', { session_id: session_id, test_run_id: test_run_id, content: content, type: type });
    }
    Runtime.setDescription = setDescription;
    async function addAttachment(session_id, test_run_id, title, content) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Name', title);
        assertTruthy('Content', content);
        return await POST('/attachment', {
            session_id: session_id,
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
    async function addLabel(session_id, test_run_id, name, value) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', { session_id: session_id, test_run_id: test_run_id, name: name, value: value });
    }
    Runtime.addLabel = addLabel;
    async function addParameter(session_id, test_run_id, kind, name, value) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Kind', kind);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', { session_id: session_id, test_run_id: test_run_id, kind: kind, name: name, value: value });
    }
    Runtime.addParameter = addParameter;
    function assertTruthy(name, value) {
        if (!value) {
            throw new Error(`${name} should be truthy, but was '${value}'`);
        }
    }
})(Runtime = exports.Runtime || (exports.Runtime = {}));
//# sourceMappingURL=runtime.js.map