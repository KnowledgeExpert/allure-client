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