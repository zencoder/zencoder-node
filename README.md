Zencoder
----

NPM package for interacting with the [Zencoder](http://zencoder.com) API.

Requires Node.js >= 6.4

### Badge Webring

[![Build Status](https://travis-ci.org/zencoder/zencoder-node.png?branch=master)](https://travis-ci.org/zencoder/zencoder-node) [![Dependency Status](https://david-dm.org/zencoder/zencoder-node.png)](https://david-dm.org/zencoder/zencoder-node) [![devDependency Status](https://david-dm.org/zencoder/zencoder-node/dev-status.png)](https://david-dm.org/zencoder/zencoder-node#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/zencoder/zencoder-node/badge.png?branch=master)](https://coveralls.io/r/zencoder/zencoder-node?branch=master)

### Getting Started

Install the NPM package

    $ npm install zencoder

Require the package in your application

    var Zencoder = require('zencoder');

Instantiate a new client. This will accept an API Key and a Base URL. If no API key is set, it will look for a `ZENCODER_API_KEY` environment variable. Base URL defaults to `https://app.zencoder.com/api/v2`.

    // If you want to specify an API key when creating a client
    var client = Zencoder('API KEY');

    // If you have the ZENCODER_API_KEY environment variable set
    var client = Zencoder();

You can also do it all in one step if you'd prefer.

    var client = require('zencoder')('API KEY');

### Usage

The library follows the API's REST conventions as closely as possible. 

Each method accepts a callback as the last parameter, and passes 3 objects to that callback: error, data, and response (in that order). Error will be null unless there's a problem with the request, data contains the body of the response from Zencoder, and response contains the raw response body, which includes HTTP codes, etc. In most cases you'll only need to check for error and then do something with the data. Below is a basic callback that we'll be using for reference in the rest of our requests.

    function callback(err, data) {
      // if err is not null, something went wrong. Print it out and return.
      if (err) { console.log(err); return; }

      // otherwise all is well. Do things with the response.
      console.log(data);
    }

If an error occurs, the error param in the callback will be an `Error` object. In the above example, `err.code` would include the HTTP status code returned by the API, and `err.message` would include the response body.

#### Promises
If no callback is supplied, the library will return a promise. The promise will be resolved with an object containing the properties `data` and `response`. All errors will be thrown, and should be handled with `.catch`.

    client.Job.details(12345)
      .then(function ({data}) {
        console.log(data);
      })
      .catch(console.log)

## [Jobs](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs)

Create a [new job](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs-Create_a_Job). We'll include an anonymous function in this one for illustration, but in the rest of the examples we'll use the callback above.

    client.Job.create({input: 'http://s3.amazonaws.com/zencodertesting/test.mov'}, function(err, data) {
      if (err) { console.log(err); return; }

      console.log(data);
    });

Get [details](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs-Get_Job_Details) about a job.

    client.Job.details(12345, callback);

Get [progress](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs-Job_Progress) on a job.

    client.Job.progress(12345, callback);

[List jobs](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs-List_Jobs). By default this returns the last 50 jobs, but this can be altered in an optional params hash.

    client.Job.list(callback);

    // With optional params hash
    client.Job.list({per_page: 5, page: 3}, callback);

[Cancel](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs-Cancel_a_Job) a job

    client.Job.cancel(12345, callback);

[Resubmit](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Jobs-Resubmit_a_Job) a job

    client.Job.resubmit(12345, callback);

## [Inputs](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Inputs)

Get [details](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Inputs-Get_Input_Details) about an input.

    client.Input.details(12345, callback);

Get [progress](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Inputs-Update_Input_Progress) for an input.

    client.Input.progress(12345, callback);

## [Outputs](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Outputs)

Get [details](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Outputs-Get_Output_Details) about an output.

    client.Output.details(12345, callback);

Get [progress](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Outputs-Update_Output_Progress) for an output.

    client.Output.progress(12345, callback);

## [Reports](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Reports)

Reports are great for getting usage data for your account. All default to 30 days from yesterday with no [grouping](https://support.brightcove.com/zencoder-encoding-settings-job#grouping), but this can be altered in the optional params hash. These will return `422 Unprocessable Entity` if the date format is incorrect or the range is greater than 2 months. Correct date format is `YYYY-MM-DD`.

Get [all usage](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Reports-Get_Usage_for_VOD___Live) (Live + VOD).

    client.Report.all(callback);

    // For a specific date range
    client.Report.all({from: '2013-05-01', to: '2013-06-01'}, callback);

    // For a specific grouping
    client.Report.all({grouping: 'aperture-testing'}, callback);

Get [VOD usage](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Reports-Get_Usage_for_VOD).

    client.Report.vod(callback);

    // For a specific date range
    client.Report.vod({from: '2013-05-01', to: '2013-06-01'}, callback);

    // For a specific grouping
    client.Report.vod({grouping: 'aperture-testing'}, callback);

Get [Live usage](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Reports-Get_Usage_for_Live).

    client.Report.live(callback);

    // For a specific date range
    client.Report.live({from: '2013-05-01', to: '2013-06-01'}, callback);

    // For a specific grouping
    client.Report.live({grouping: 'aperture-testing'}, callback);

## [Accounts](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Accounts)

Create a [new account](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Accounts-Create_an_Account). A unique email address and terms of service are required, but you can also specify a password (and confirmation) along with whether or not you want to subscribe to the Zencoder newsletter. New accounts will be created under the Test (Free) plan.

	client.Account.create({email: 'tedjones@example.com', terms_of_service: 1}, callback);

	// Create an account with all possible options
	client.Account.create({
		email: 'tedjones2@example.com',
		terms_of_service: 1,
		password: 'sureamgladforssl',
		password_confirmation: 'sureamgladforssl',
		newsletter: 0
	}, callback);

Get [details](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Accounts-Get_Account_Details) about the current account.

	client.Account.details(callback);

Turn [integration mode](https://brightcovelearning.github.io/Brightcove-API-References/zencoder-api/v2/doc/index.html#api-Accounts-Turn_On_Integration_Mode) on (all jobs are test jobs).

    client.Account.integration(callback);

Turn off integration mode, which means your account is live (and you'll be billed for jobs).

	client.Account.live(callback);

## Advanced Options

You can specify options by passing in a third, optional parameter when instantiating a new client. Right now, the only option available is `timeout`, but more will be added.

    var client = new Zencoder('API_KEY', 'BASE_URL', {timeout: 5000});

## Tests

The tests use [Nock](https://github.com/flatiron/nock) to mock HTTP requests to the Zencoder API, and as a result you might find scopes.js useful if you just want to take a look at sample response bodies.

To run the tests:

	$ git clone git@github.com:zencoder/zencoder-node.git
	$ cd zencoder-node
	$ npm install
	$ make test

----

Special thanks to [Ryan Faerman](http://www.ryanfaerman.com/) for maintaining the original Zencoder NPM module.
