export class Description {
    private readonly value;
    private readonly type;

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
