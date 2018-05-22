# Allure http client

Wrapper for [allure-server](https://github.com/KnowledgeExpert/allure-server) http client for NodeJS in Typescript. Can be used for working with allure-server and generating allure XML from allure-server JSON data.

## Description

Repository contains [Runtime](./lib/runtime.ts) module which handles http layer, and [Session](./lib/beans/session.ts) module which wraps `Runtime` and provides concise API for tests.

## Example

For Jasmine you can simple inject allure-client as custom reporter:

`base-spec.ts`
```
  const Configuration = require("allure-client").Configuration;

  // setup some configurations
  Configuration.baseUrl = "http://localhost:3000";
  Configuration.baseDir = "build/allure-results";

  // create Session object (it will automatically generate unic UUID for further operations)
  const session = await Session.create();

  jasmine.getEnv().addReporter({
    suiteStarted: async function (suite) {
      await session.startSuite(suite.fullName);
    },
    specStarted: async function (spec) {
      await session.startTest(spec.description)
    },
    specDone: async function (spec) {
      const status = getTestcaseStatus(spec.status);
      if (status !== 'passed') {
        await session.endTest(status);
      } else {
        await session.endTest(status, getTestcaseError(spec));
      }
    },
    suiteDone: async function (result) {
      await session.endSuite();
    },
    jasmineDone: async function () {
      // after all tests done, you should call writeToXML() method
      // it will automatically pull collected data in JSON format
      // and write it in local directory as XML structure
      // which can be handled be allure-cli
      await session.writeToXML();
    }
  });

// util functions
function getTestcaseStatus(status): 'skipped' | 'passed' | 'failed' {
    if (status === 'disabled' || status === 'pending') {
        return 'skipped';
    } else if (status === 'passed') {
        return 'passed';
    } else {
        return 'failed';
    }
}

function getTestcaseError(result) {
    if (result.status === 'disabled') {
        return {
            message: 'This test was ignored',
            stack: ''
        };
    } else if (result.status === 'pending') {
        return {
            message: result.pendingReason,
            stack: ''
        };
    }
    return result.failedExpectations
        ? result.failedExpectations[0]
        : {
            message: 'No failure expectations found.',
            stack: ''
        };
}
```

## Configuration
[Configuration](./lib/configuration.ts) for module consists of:
  * `Configuration.baseUrl` - allure-server uri
  * `Configuration.baseAuth` - allure-server basic auth (optional)
  * `Configuration.baseDir` - directory where allure-client will store XML and attachments for Allure-Cli (default - `./allure-results`)

*Note:* `Configuration.baseUrl` should be initialized before calling any `Session` or `Runtime` methods;

## Session API

* Create new `Session`
  * Entry point for `Session`, should be called to get `Session` object.
  * sample:
    ```
    const session = await Session.create();
    ```
* Start new suite
  * starts new test suite
  * parameters:
    * `name: string` - suite name
    * `timestamp: number` - operation time
      * default value - `Date.now()`
  * sample:
    ```
    await session.startSuite('My Suite Name');
    ```
* End suite
  * ends current test suite
  * parameters:
    * `timestamp: number` - operation time
      * default value - `Date.now()`
  * sample:
    ```
    await session.endSuite();
    ```
* Start test case
  * starts new test case in currrent test suite
    * parameters:
      * `name: string` - test case name
      * `timestamp: number` - operation time
        * default value - `Date.now()`
    * sample:
      ```
      await session.startTest('My Test Name');
      ```
* End test case
  * ends current test case
    * parameters:
      * `status: string` - test case status
        * possible values:
          * `broken`
          * `failed`
          * `passed`
          * `skipped`
      * `error: Error` - error object (optional)
      * `timestamp: number` - operation time
        * default value - `Date.now()`
    * sample:
      ```
      const error = new Error('Something went wrong');
      await session.endTest('failed', error);
      ```
* Start test step
  * starts new test step in current test case
    * parameters:
          * `name: string` - test step name
          * `timestamp: number` - operation time
            * default value - `Date.now()`
        * sample:
          ```
          await session.startStep('My Test Name');
          ```
* End test step
  * ends test step in current test case
    * parameters:
          * `status: string` - test step status
            * possible options:
              * `failed`
              * `passed`
          * `timestamp: number` - operation time
            * default value - `Date.now()`
        * sample:
          ```
          await session.endStep('passed');
          ```
* Write to XML
  * pop's accumulated session data from server and writes it to local storage
  * parameters:
    * `name: string` - test label name
    * `value: string` - test label content
  * sample:
    ```
    await session.writeToXML();
    ```
* Set description
  * sets description for current test case
    * parameters:
          * `type: string` - description type
            * possible options:
              * `text`
              * `html`
              * `markdown`
          * `content: string` - description content
        * sample:
          ```
          await session.setDescription('text', 'some custom test description');
          ```
* Add attachment
  * add attachment to current test case or step
    * parameters:
          * `title: string` - attachment title
          * `content :  ReadStream | Object` - attachment data
            * `ReadStream` - just pass attachment as `ReadStream`
            * `Object: { mime: string, buffer: Buffer }` - if you had a buffer, you should pass it with specifying mime-type for file
        * sample:
          ```
          const readStream = fs.createReadStream('file1.txt');
          const buff = fs.readFileSync('fil2.txt');
          await session.addAttachment('file 1', readStream);
          await session.addAttachment('file 2', {mime: 'text/plain', buffer: buff});
          ```
* Set Severity
  * set test case severity
    * parameters:
          * `severity: string` - test severity
            * possible options:
              * `blocker`
              * `critical`
              * `normal`
              * `minor`
              * `trivial`
        * sample:
          ```
          await session.setSeverity('critical');
          ```
* Add Epic
  * add test case Epic
    * parameters:
          * `epic: string` - test Epic
        * sample:
          ```
          await session.addEpic('Super Epic');
          ```
* Add Story
  * add test case Story
    * parameters:
          * `story: string` - test Story
        * sample:
          ```
          await session.addEpic('Super Story');
          ```
* Add Feature
  * add test case Feature
    * parameters:
          * `feature: string` - test Feature
        * sample:
          ```
          await session.addFeature('Super Feature');
          ```
* Add Environment
  * add test case Environment
    * parameters:
          * `name: string` - Environment name
          * `value: string` - Environment value
        * sample:
          ```
          await session.addEnvironment('Chrome', '56');
          ```
* Add label
  * add test case label
    * parameters:
          * `name: string` - test label name
          * `value: string` - test label content
        * sample:
          ```
          await session.addLabel('some label name', 'mapped value');
          ```
* Add label
  * add test case label
    * parameters:
          * `name: string` - test label name
          * `value: string` - test label content
        * sample:
          ```
          await session.addLabel('some label name', 'mapped value');
          ```