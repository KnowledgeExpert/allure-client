export declare class Attachment {
    readonly title: string;
    readonly mime: string;
    readonly fullFilePath: string;
    readonly fileName: string;
    readonly size: number;
    constructor(attachmentObject: any);
    private writeFile(buffer, fileName, baseDir?);
    toXML(): {
        '@': {
            title: string;
            source: string;
            type: string;
            size: number;
        };
    };
}
