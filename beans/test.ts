import {Attachment} from "./attachment";
import {Step} from "./step";
import {Parameter} from "./parameter";
import {Label} from "./label";
import {Description} from "./description";

export class Test {
    public readonly name: string;
    public readonly start: number;
    public readonly stop: number;
    public readonly failure: any;
    public readonly status: string;
    public readonly labels: Label[];
    public readonly parameters: Parameter[];
    public readonly description: Description;
    public readonly attachments: Attachment[];
    public readonly steps: Step[];

    constructor(testObject) {
        this.name = testObject.name;
        this.start = testObject.start;
        this.stop = testObject.stop;
        this.failure = testObject.failure;
        this.status = testObject.status;
        this.labels = testObject.labels ? testObject.labels : [];
        this.parameters = testObject.parameters ? testObject.parameters : [];
        this.description = testObject.description ? new Description(testObject.description) : null;
        this.attachments = testObject.attachments ? testObject.attachments.map(attachmentObject => new Attachment(attachmentObject)) : [];
        this.steps = testObject.steps ? testObject.steps.map(stepObject => new Step(stepObject)) : [];
    }

    toXML() {
        const result: any = {
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

        if(this.stop) {
            result['@'].stop = this.stop;
        }

        return result;
    }
}
