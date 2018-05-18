import { Attachment } from "./attachment";
export declare class Step {
    private readonly name;
    private readonly status;
    private readonly start;
    private readonly stop;
    readonly attachments: Attachment[];
    readonly innerSteps: Step[];
    constructor(stepObject: any);
    toXML(): any;
}
