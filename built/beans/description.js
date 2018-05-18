"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Description {
    constructor(descriptionObject) {
        this.value = descriptionObject.value;
        this.type = descriptionObject.type;
    }
    toXML() {
        return {
            '@': {
                type: this.type
            },
            '#': this.value
        };
    }
}
exports.Description = Description;
//# sourceMappingURL=description.js.map