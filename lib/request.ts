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

import {Configuration} from "./configuration";
import * as request from "request-promise-native";


export namespace Request {

    export async function DELETE(path: string, body?: any) {
        return await httpRequest({
            path: path,
            method: 'delete',
            query: body
        });
    }

    export async function GET(path: string, body?: any) {
        return await httpRequest({
            path: path,
            method: 'get',
            query: body,
            json: true
        });
    }

    export async function POST(path: string, body: any) {
        return path === '/attachment'
            ? await httpRequest({path: path, method: 'post', formData: body, json: true})
            : await httpRequest({path: path, method: 'post', body: body, json: true});
    }

    async function httpRequest(args: { path: string, method: string, body?: any, formData?: any, query?: any, json?: boolean }) {
        const options: any = {
            uri: `${Configuration.baseUrl}${args.path}`,
            method: args.method,
            resolveWithFullResponse: true
        };

        if (args.formData) {
            options.formData = args.formData;
        } else if (args.body) {
            options.body = args.body;
        } else if (args.query) {
            options.qs = args.query;
        }

        if (args.json) {
            options.json = true;
        }
        // console.log(options);
        try {
            return await request(options);
        } finally {
            console.log(`request sent ${options.method} ${options.uri} ${options.body ? options.body.session_id : ''} ${options.body ? options.body.test_run_id : ''}`);
        }
    }

}