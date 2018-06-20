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