import {Test} from "./test";

export class Suite {
    public readonly name: string;
    public readonly start: number;
    public readonly stop: number;
    public readonly tests: Test[] = [];

    constructor(suiteObject) {
        this.name = suiteObject.name;
        this.start = suiteObject.start;
        this.stop = suiteObject.stop;
        this.tests = suiteObject.tests.map(cachedTest => new Test(cachedTest));
    }

    toXML() {
        const result: any = {
            '@': {
                'xmlns:ns2' : 'urn:model.allure.qatools.yandex.ru',
                start: this.start,
            },
            name: this.name,
            title: this.name,
            'test-cases': {
                'test-case': this.tests.map(test => test.toXML())
            }
        };

        if(this.stop) {
            result['@'].stop = this.stop;
        }

        return result;
    }
}