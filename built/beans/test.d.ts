import { Attachment } from "./attachment";
import { Step } from "./step";
import { Parameter } from "./parameter";
import { Label } from "./label";
import { Description } from "./description";
export declare class Test {
    readonly name: string;
    readonly start: number;
    readonly stop: number;
    readonly failure: any;
    readonly status: string;
    readonly labels: Label[];
    readonly parameters: Parameter[];
    readonly description: Description;
    readonly attachments: Attachment[];
    readonly steps: Step[];
    constructor(testObject: any);
    toXML(): any;
}
