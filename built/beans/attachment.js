"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const configuration_1 = require("../configuration");
const fs = require("fs-extra");
class Attachment {
    constructor(attachmentObject) {
        const buff = new Buffer(attachmentObject.bufferString);
        this.title = attachmentObject.title;
        this.mime = attachmentObject.mime;
        this.size = buff.length;
        this.fileName = attachmentObject.fileId;
        this.writeFile(buff, attachmentObject.fileId);
    }
    writeFile(buffer, fileName, baseDir = configuration_1.Configuration.baseDir) {
        const fullFilePath = path.join(baseDir, fileName);
        fs.outputFileSync(fullFilePath, buffer);
        return fullFilePath;
    }
    toXML() {
        return {
            '@': {
                title: this.title,
                source: this.fileName,
                type: this.mime,
                size: this.size
            }
        };
    }
}
exports.Attachment = Attachment;
//# sourceMappingURL=attachment.js.map