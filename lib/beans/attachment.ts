// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as path from "path";
import {Configuration} from "../configuration";
import * as fs from "fs-extra";

export class Attachment {
    public readonly title: string;
    public readonly mime: string;
    public readonly fullFilePath: string;
    public readonly fileName: string;
    public readonly size: number;

    constructor(attachmentObject) {
        const buff = new Buffer(attachmentObject.buffer);

        this.title = attachmentObject.title;
        this.mime = attachmentObject.mime;
        this.size = buff.length;
        this.fileName = attachmentObject.fileId;
        this.writeFile(buff, attachmentObject.fileId);
    }

    private writeFile(buffer: Buffer, fileName: string, baseDir = Configuration.baseDir): string {
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
