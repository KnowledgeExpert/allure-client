/// <reference types="node" />
import { ReadStream } from "fs";
export declare namespace Runtime {
    function getSessionId(): Promise<any>;
    function popData(uuid: string): Promise<any>;
    function startSuite(uuid: string, name: string, timestamp?: number): Promise<any>;
    function endSuite(uuid: string, timestamp?: number): Promise<any>;
    function startTest(uuid: string, name: string, timestamp?: number): Promise<any>;
    function endTest(uuid: string, status: string, error?: Error, timestamp?: number): Promise<any>;
    function startStep(uuid: string, name: string, timestamp?: number): Promise<any>;
    function endStep(uuid: string, status: string, timestamp?: number): Promise<any>;
    function addDescription(uuid: string, type: string, content: string): Promise<any>;
    function addAttachment(uuid: string, title: string, content: ReadStream | {
        mime: string;
        buffer: Buffer;
    }): Promise<any>;
    function addLabel(uuid: string, name: string, value: string): Promise<any>;
    function addParameter(uuid: string, kind: string, name: string, value: string): Promise<any>;
}
