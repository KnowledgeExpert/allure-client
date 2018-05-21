import {Request} from "./request";
import GET = Request.GET;
import POST = Request.POST;
import {ReadStream} from "fs";

export namespace Runtime {

    export async function getSessionId() {
        return await GET('/session');
    }

    export async function popData(uuid: string) {
        assertTruthy('Uuid', uuid);
        return await GET('/popdata', {uuid: uuid});
    }

    export async function startSuite(uuid: string, name: string, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Timestamp', timestamp);
        assertTruthy('Suite name', name);
        return await POST('/startsuite', {uuid: uuid, name: name, timestamp: timestamp});
    }

    export async function endSuite(uuid: string, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endsuite', {uuid: uuid, timestamp: timestamp});
    }

    export async function startTest(uuid: string, name: string, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Test name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/starttest', {uuid: uuid, name: name, timestamp: timestamp});
    }

    export async function endTest(uuid: string, status: string, error?: Error, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return error
            ? await POST('/endtest', {
                status: status,
                error: JSON.stringify({uuid: uuid, message: error.message, stackTrace: error.stack}),
                timestamp: timestamp
            })
            : await POST('/endtest', {uuid: uuid, status: status, timestamp: timestamp});
    }

    export async function startStep(uuid: string, name: string, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Step name', name);
        assertTruthy('Timestamp', timestamp);
        return await POST('/startstep', {uuid: uuid, name: name, timestamp: timestamp});
    }

    export async function endStep(uuid: string, status: string, timestamp = Date.now()) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Status', status);
        assertTruthy('Timestamp', timestamp);
        return await POST('/endstep', {uuid: uuid, status: status, timestamp: timestamp});
    }

    export async function setDescription(uuid: string, type: string, content: string) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Content', content);
        assertTruthy('Type', type);
        return await POST('/description', {uuid: uuid, content: content, type: type});
    }

    export async function addAttachment(uuid: string, title: string, content: ReadStream | { mime: string, buffer: Buffer }) {
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
            } : content as ReadStream
        });
    }

    export async function addLabel(uuid: string, name: string, value: string) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', {uuid: uuid, name: name, value: value});
    }

    export async function addParameter(uuid: string, kind: string, name: string, value: string) {
        assertTruthy('Uuid', uuid);
        assertTruthy('Kind', kind);
        assertTruthy('Name', name);
        assertTruthy('Value', value);
        return await POST('/label', {uuid: uuid, kind: kind, name: name, value: value});
    }

    function assertTruthy(name: string, value: any) {
        if (!value) {
            throw new Error(`${name} should be truthy, but was '${value}'`);
        }
    }

}