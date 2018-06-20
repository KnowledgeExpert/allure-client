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

import {Attachment} from "./attachment";

export class Step {
    private readonly name: string;
    private readonly status: string;
    private readonly start: number;
    private readonly stop: number;
    public readonly attachments: Attachment[] = [];
    public readonly innerSteps: Step[] = [];

    constructor(stepObject) {
        this.name = stepObject.name;
        this.status = stepObject.status;
        this.start = stepObject.start;
        this.stop = stepObject.stop;
        this.attachments = stepObject.attachments.map(attachmentObject => new Attachment(attachmentObject));
        this.innerSteps = stepObject.innerSteps.map(stepObject => new Step(stepObject));
    }

    toXML() {
        const result: any = {
            '@': {
                start: this.start,
                status: this.status
            },
            name: this.name,
            title: this.name,
            attachments: {
                attachment: this.attachments.map(attachment => attachment.toXML())
            },
            steps: {
                step: this.innerSteps.map(step => step.toXML())
            }
        };

        if(this.stop) {
            result['@'].stop = this.stop;
        }

        return result;
    }
}