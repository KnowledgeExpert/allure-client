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
const attachment_1 = require("./attachment");
const step_1 = require("./step");
const description_1 = require("./description");
class Test {
    constructor(testObject) {
        this.name = testObject.name;
        this.start = testObject.start;
        this.stop = testObject.stop;
        this.failure = testObject.failure;
        this.status = testObject.status;
        this.labels = testObject.labels ? testObject.labels : [];
        this.parameters = testObject.parameters ? testObject.parameters : [];
        this.description = testObject.description ? new description_1.Description(testObject.description) : null;
        this.attachments = testObject.attachments ? testObject.attachments.map(attachmentObject => new attachment_1.Attachment(attachmentObject)) : [];
        this.steps = testObject.steps ? testObject.steps.map(stepObject => new step_1.Step(stepObject)) : [];
    }
    toXML() {
        const result = {
            '@': {
                start: this.start,
                status: this.status
            },
            name: this.name,
            title: this.name,
            labels: {
                label: this.labels.map(label => {
                    return { '@': label };
                })
            },
            parameters: {
                parameter: this.parameters.map(param => {
                    return { '@': param };
                })
            },
            steps: {
                step: this.steps.map(step => step.toXML())
            },
            attachments: {
                attachment: this.attachments.map(attachment => attachment.toXML())
            }
        };
        if (this.failure) {
            result.failure = this.failure;
        }
        if (this.description) {
            result.description = this.description.toXML();
        }
        if (this.stop) {
            result['@'].stop = this.stop;
        }
        return result;
    }
}
exports.Test = Test;
//# sourceMappingURL=test.js.map