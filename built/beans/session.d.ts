/// <reference types="node" />
import { ReadStream } from "fs";
export declare class Session {
    readonly uuid: string;
    private constructor();
    static create(uuid?: string): Promise<Session>;
    startSuite(name: string, timestamp?: number): Promise<any>;
    endSuite(timestamp?: number): Promise<any>;
    startTest(name: string, timestamp?: number): Promise<any>;
    endTest(status: 'broken' | 'failed' | 'passed' | 'skipped', error?: Error, timestamp?: number): Promise<any>;
    startStep(name: string, timestamp?: number): Promise<any>;
    endStep(status: 'failed' | 'passed', timestamp?: number): Promise<any>;
    setDescription(type: 'text' | 'html' | 'markdown', content: string): Promise<any>;
    addAttachment(title: string, content: ReadStream | {
        mime: string;
        buffer: Buffer;
    }): Promise<any>;
    setSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): Promise<any>;
    addEpic(epic: string): Promise<any>;
    addStory(story: string): Promise<any>;
    addFeature(feature: string): Promise<any>;
    addLabel(name: string, value: string): Promise<any>;
    addEnvironment(name: string, value: string): Promise<any>;
    addArgument(kind: string, name: string, value: string): Promise<any>;
    addParameter(kind: string, name: string, value: string): Promise<any>;
    writeToXML(): Promise<void>;
    private popData();
}
