import * as https from "https";
import * as http from "http";
import {Configuration} from "./configuration";
import * as fs from "fs";


export namespace Request {

    export async function POST(command = '/', parametersMap: any): Promise<any> {
        return await httpRequest({
            protocol: baseProtocol(),
            host: baseHost(),
            port: basePort(),
            method: 'post',
            path: `${command}`,
            body: getBody(parametersMap),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(getBody(parametersMap))
            }
        });
    }

    export async function DELETE(command = '/', parametersMap?: any): Promise<any> {
        return await httpRequest({
            protocol: baseProtocol(),
            host: baseHost(),
            port: basePort(),
            method: 'delete',
            path: `${command}${getQuery(parametersMap)}`
        });
    }

    export async function GET(command = '/', parametersMap?: any): Promise<any> {
        return await httpRequest({
            protocol: baseProtocol(),
            host: baseHost(),
            port: basePort(),
            method: 'get',
            path: `${command}${getQuery(parametersMap)}`
        });
    }

    function getBody(object: any): string {
        console.log(`Object.keys(object)
            .map(key => \`$\{key}=$\{object[key]}\`)
            .join('&').length ${Object.keys(object)
            .map(key => `${key}=${object[key]}`)
            .join('&').length}`);
        return Object.keys(object)
            .map(key => `${key}=${object[key]}`)
            .join('&');
    }

    function getQuery(object: any): string {
        if (!object) {
            return '';
        }
        const queryParams = Object.keys(object)
            .map(key => `${key}=${object[key]}`)
            .join('&');
        return queryParams ? `?${queryParams}` : '';
    }

    function baseProtocol() {
        const chunks = getBaseUriChunks();
        return chunks[1];
    }

    function baseHost() {
        const chunks = getBaseUriChunks();
        return chunks[2];
    }

    function basePort() {
        const chunks = getBaseUriChunks();
        return chunks[3];
    }

    function getBaseUriChunks(): string[] {
        return Configuration.baseUrl.match(/(^\w+:)\/\/([\w\.]+)[\/:](\d+)/);
    }

    async function httpRequest(options: {
        host: string,
        port: string,
        method: string,
        path: string,
        protocol?: string,
        headers?: any,
        auth?: {
            username: string,
            password: string
        },
        body?: any
    }): Promise<{ headers: any, body: any | string }> {
        return await new Promise<{ headers: any, body: any | string }>((resolve, reject) => {

            const requestOptions = {
                protocol: options.protocol || 'http:',
                host: options.host,
                port: options.port,
                path: options.path,
                method: options.method,
                headers: options.headers
            };

            const performRequest = (requestOptions.protocol === 'http:' ? http.request : https.request);

            const request = performRequest(requestOptions, (response) => {
                let rawData = '';
                response.on('data', chunk => rawData += chunk);
                response.on('error', err => reject(err));
                response.on('end', () => {
                    let body;
                    try {
                        body = JSON.parse(rawData);
                    } catch (error) {
                        body = rawData;
                    }
                    const result = {
                        headers: response.headers,
                        body: body
                    };
                    if (response.statusCode === 200) {
                        resolve(result)
                    } else {
                        const error: Error = new Error();
                        error.message = body.message;
                        error.stack = body.stack;
                        reject(error);
                    }
                });
            });
            if (options.body) {
                console.log(`options.body.length ${options.body.length}`);
                request.write(options.body);
            } else {
                request.end();
            }
        });
    }
}