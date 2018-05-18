"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_cookies_1 = require("jasmine-cookies");
const session_1 = require("./beans/session");
const fs = require("fs-extra");
const path = require("path");
const configuration_1 = require("./configuration");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
const buff1 = fs.readFileSync(path.resolve(__dirname, '../1.png'));
const buff2 = fs.readFileSync(path.resolve(__dirname, '../2.png'));
const stream1 = fs.createReadStream(path.resolve(__dirname, '../3.png'));
const stream2 = fs.createReadStream(path.resolve(__dirname, '../4.png'));
configuration_1.Configuration.baseUrl = "http://localhost:3000";
jasmine_cookies_1.Describe(`S1`, () => {
    jasmine_cookies_1.It(`T1`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S1");
        await session.startTest("T1");
        await session.endTest("passed");
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T2`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S2");
        await session.startTest("T1");
        await session.endTest("passed");
        await session.startTest("T2");
        await session.endTest('skipped');
        await session.startTest("T3");
        await session.endTest('failed');
        await session.startTest("T5");
        await session.endTest('broken');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T3`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S3");
        await session.startTest("T1");
        await session.addFeature("chrome");
        await session.addStory("56");
        await session.endTest('failed');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T4`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S4");
        await session.startTest("T1");
        await session.setDescription('text', "hello world");
        await session.endTest('failed');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T5`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S5");
        await session.startTest("T1");
        await session.addEpic("some epic");
        await session.endTest('failed');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T6`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S6");
        await session.startTest("T1");
        await session.setSeverity('blocker');
        await session.endTest('failed');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T7`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S7");
        await session.startTest("T1");
        await session.startStep("step 1");
        await session.endStep('passed');
        await session.startStep("step 2");
        await session.endStep('passed');
        await session.startStep("step 3");
        await session.endStep('failed');
        await session.endTest('failed');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T8`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S8");
        await session.startTest("T1");
        await session.startStep("step 1");
        await session.startStep("step 2");
        await session.startStep("step 3");
        await session.endStep('passed');
        await session.endStep('passed');
        await session.endStep('failed');
        await session.endTest('failed');
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T9`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S9");
        await session.startTest("T1");
        await session.addAttachment("screenshot 1", { mime: 'image/png', buffer: buff1 });
        await session.endTest("passed");
        await session.endSuite();
        await session.writeToXML();
    });
    jasmine_cookies_1.It(`T10`, async () => {
        const session = await session_1.Session.create();
        await session.startSuite("S10");
        await session.startTest("T1");
        await session.addAttachment("screenshot 2", stream1);
        await session.endTest("passed");
        await session.endSuite();
        await session.writeToXML();
    });
    // It(`T11`, async () => {
    //     const session = await Session.create();
    //     await session.startSuite("S11");
    //     await session.startTest("T1");
    //     await session.addAttachment("screenshot 1", {mime: 'image/png', buffer: buff1});
    //     await session.addAttachment("screenshot 2", stream1);
    //     await session.endTest("passed");
    //     await session.endSuite();
    //     await session.writeToXML();
    // });
    //
    // It(`T12`, async () => {
    //     const session = await Session.create();
    //     await session.startSuite("S12");
    //     await session.startTest("T1");
    //     await session.startStep("ST1");
    //     await session.addAttachment("screenshot 1", {mime: 'image/png', buffer: buff1});
    //     await session.endStep("passed");
    //     await session.startStep("ST2");
    //     await session.addAttachment("screenshot 2", stream1);
    //     await session.endStep("passed");
    //     await session.endTest("passed");
    //     await session.endSuite();
    //     await session.writeToXML();
    // });
    //
    // It(`T13`, async () => {
    //     const session = await Session.create();
    //     await session.startSuite("S12");
    //     await session.startTest("T1");
    //     await session.startStep("ST1");
    //     await session.startStep("ST2");
    //     await session.addAttachment("screenshot 1", {mime: 'image/png', buffer: buff1});
    //     await session.addAttachment("screenshot 2", stream1);
    //     await session.endStep("passed");
    //     await session.endStep("passed");
    //     await session.endTest("passed");
    //     await session.endSuite();
    //     await session.writeToXML();
    // });
});
//# sourceMappingURL=test.js.map