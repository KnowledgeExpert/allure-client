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
            console.log(`request sent ${options.method} ${options.uri}`);
        }
    }

}