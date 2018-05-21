"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("./configuration");
const request = require("request-promise-native");
var Request;
(function (Request) {
    async function DELETE(path, body) {
        return await httpRequest({
            path: path,
            method: 'delete',
            query: body
        });
    }
    Request.DELETE = DELETE;
    async function GET(path, body) {
        return await httpRequest({
            path: path,
            method: 'get',
            query: body,
            json: true
        });
    }
    Request.GET = GET;
    async function POST(path, body) {
        return path === '/attachment'
            ? await httpRequest({ path: path, method: 'post', formData: body, json: true })
            : await httpRequest({ path: path, method: 'post', body: body, json: true });
    }
    Request.POST = POST;
    async function httpRequest(args) {
        const options = {
            uri: `${configuration_1.Configuration.baseUrl}${args.path}`,
            method: args.method,
            resolveWithFullResponse: true
        };
        if (args.formData) {
            options.formData = args.formData;
        }
        else if (args.body) {
            options.body = args.body;
        }
        else if (args.query) {
            options.qs = args.query;
        }
        if (args.json) {
            options.json = true;
        }
        // console.log(options);
        try {
            return await request(options);
        }
        finally {
            console.log(`request sent ${options.method} ${options.uri}`);
        }
    }
})(Request = exports.Request || (exports.Request = {}));
//# sourceMappingURL=request.js.map