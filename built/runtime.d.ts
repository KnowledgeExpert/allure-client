/// <reference types="node" />
import { ReadStream } from "fs";
export declare namespace Runtime {
    function getNewId(): Promise<any>;
    function popData(session_id: string): Promise<any>;
    function startSuite(session_id: string, test_run_id: string, name: string, timestamp?: number): Promise<any>;
    function endSuite(session_id: string, test_run_id: string, timestamp?: number): Promise<any>;
    function startTest(session_id: string, test_run_id: string, name: string, timestamp?: number): Promise<any>;
    function endTest(session_id: string, test_run_id: string, status: string, error?: Error, timestamp?: number): Promise<any>;
    function startStep(session_id: string, test_run_id: string, name: string, timestamp?: number): Promise<any>;
    function endStep(session_id: string, test_run_id: string, status: string, timestamp?: number): Promise<any>;
    function setDescription(session_id: string, test_run_id: string, type: string, content: string): Promise<any>;
    function addAttachment(session_id: string, test_run_id: string, title: string, content: ReadStream | {
        mime: string;
        buffer: Buffer;
    }): Promise<any>;
    function addLabel(session_id: string, test_run_id: string, name: string, value: string): Promise<any>;
    function addParameter(session_id: string, test_run_id: string, kind: string, name: string, value: string): Promise<any>;
}
