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

import {Request} from "./request";
import {ReadStream} from "fs";
import GET = Request.GET;
import POST = Request.POST;

export namespace Runtime {

    export async function getNewId() {
        return await GET('/newid');
    }

    export async function popData(session_id: string) {
        assertTruthy('Uuid', session_id);
        return await GET('/popdata', {session_id: session_id});
    }

    export async function startSuite(session_id: string, test_run_id: string, name: string, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Timestamp', timestamp);
        assertTruthy('Suite name', name);
        return await POST('/startsuite', {session_id: session_id, test_run_id: test_run_id, name: name, timestamp: timestamp});
    }

    export async function endSuite(session_id: string, test_run_id: string, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endsuite', {session_id: session_id, test_run_id: test_run_id, timestamp: timestamp});
    }

    export async function startTest(session_id: string, test_run_id: string, name: string, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Test name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/starttest', {session_id: session_id, test_run_id: test_run_id, name: name, timestamp: timestamp});
    }

    export async function endTest(session_id: string, test_run_id: string, status: string, error?: Error, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return error
            ? await POST('/endtest', {
                status: status,
                error: JSON.stringify({session_id: session_id, test_run_id: test_run_id, message: error.message, stackTrace: error.stack}),
                timestamp: timestamp
            })
            : await POST('/endtest', {session_id: session_id, test_run_id: test_run_id, status: status, timestamp: timestamp});
    }

    export async function startStep(session_id: string, test_run_id: string, name: string, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Step name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/startstep', {session_id: session_id, test_run_id: test_run_id, name: name, timestamp: timestamp});
    }

    export async function endStep(session_id: string, test_run_id: string, status: string, timestamp = Date.now()) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endstep', {session_id: session_id, test_run_id: test_run_id, status: status, timestamp: timestamp});
    }

    export async function setDescription(session_id: string, test_run_id: string, type: string, content: string) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Content', content);
        assertTruthy('Type', type);
        return await POST('/description', {session_id: session_id, test_run_id: test_run_id, content: content, type: type});
    }

    export async function addAttachment(session_id: string, test_run_id: string, title: string, content: ReadStream | { mime: string, buffer: Buffer }) {
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
            } : content as ReadStream
        });
    }

    export async function addLabel(session_id: string, test_run_id: string, name: string, value: string) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', {session_id: session_id, test_run_id: test_run_id, name: name, value: value});
    }

    export async function addParameter(session_id: string, test_run_id: string, kind: string, name: string, value: string) {
        assertTruthy('Uuid', session_id);
        assertTruthy('Kind', kind);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', {session_id: session_id, test_run_id: test_run_id, kind: kind, name: name, value: value});
    }

    function assertTruthy(name: string, value: any) {
        if (!value) {
            throw new Error(`${name} should be truthy, but was '${value}'`);
        }
    }

}