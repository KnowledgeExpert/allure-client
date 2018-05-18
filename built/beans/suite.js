"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
class Suite {
    constructor(suiteObject) {
        this.tests = [];
        this.name = suiteObject.name;
        this.start = suiteObject.start;
        this.stop = suiteObject.stop;
        this.tests = suiteObject.tests.map(cachedTest => new test_1.Test(cachedTest));
    }
    toXML() {
        const result = {
            '@': {
                'xmlns:ns2': 'urn:model.allure.qatools.yandex.ru',
                start: this.start,
            },
            name: this.name,
            title: this.name,
            'test-cases': {
                'test-case': this.tests.map(test => test.toXML())
            }
        };
        if (this.stop) {
            result['@'].stop = this.stop;
        }
        return result;
    }
}
exports.Suite = Suite;
//# sourceMappingURL=suite.js.map