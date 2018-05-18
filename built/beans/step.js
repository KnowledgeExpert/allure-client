"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attachment_1 = require("./attachment");
class Step {
    constructor(stepObject) {
        this.attachments = [];
        this.innerSteps = [];
        this.name = stepObject.name;
        this.status = stepObject.status;
        this.start = stepObject.start;
        this.stop = stepObject.stop;
        this.attachments = stepObject.attachments.map(attachmentObject => new attachment_1.Attachment(attachmentObject));
        this.innerSteps = stepObject.innerSteps.map(stepObject => new Step(stepObject));
    }
    toXML() {
        const result = {
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
        if (this.stop) {
            result['@'].stop = this.stop;
        }
        return result;
    }
}
exports.Step = Step;
//# sourceMappingURL=step.js.map