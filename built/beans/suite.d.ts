import { Test } from "./test";
export declare class Suite {
    readonly name: string;
    readonly start: number;
    readonly stop: number;
    readonly tests: Test[];
    constructor(suiteObject: any);
    toXML(): any;
}
