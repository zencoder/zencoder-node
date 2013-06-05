Zencoder
----

[![Build Status](https://travis-ci.org/zencoder/zencoder-node.png?branch=master)](https://travis-ci.org/zencoder/zencoder-node) [![Dependency Status](https://david-dm.org/zencoder/zencoder-node.png)](https://david-dm.org/zencoder/zencoder-node) [![devDependency Status](https://david-dm.org/zencoder/zencoder-node/dev-status.png)](https://david-dm.org/zencoder/zencoder-node#info=devDependencies)

NPM package for interacting with the Zencoder API.

Requires Node.js >= 0.8

### Getting Started

Install the NPM package

    $ npm install zencoder

Require the package in your application

    var Zencoder = require('zencoder');

Instantiate a new client. This will accept an API Key and a Base URL. If no API key is set, it will look for a `ZENCODER_API_KEY` environment variable. Base URL defaults to `https://app.zencoder.com/api/v2`.

    var client = new Zencoder('API KEY');

### Usage

The library follows the API's REST conventions as closely as possible. Each method accepts a callback as the last parameter, and passes 3 objects to that callback: error, data, and response (in that order). Error will be null unless there's a problem with the request, data contains the body of the response from Zencoder, and response contains the raw response body, which includes HTTP codes, etc. In most cases you'll only need to check for error and then do somewith with the data. Below is a basic callback that we'll be using for reference in the rest of our requests.

    function callback(err, data) {
      // if err is not null, something went wrong. Print it out and return.
      if (err) { console.log(err); return; }

      // otherwise all is well. Do things with the response.
      console.log(data);
    }


## Jobs

Create a new job. We'll include an anonymous function in this one for illustration, but in the rest of the examples we'll use the callback above.

    client.Job.create({input: 'http://s3.amazonaws.com/zencodertesting/test.mov'}, function(err, data) {
      if (err) { console.log(err); return; }

      console.log(data);
    });

Get details about a job.

    client.Job.details(12345, callback(err, data));

Get progress on a job.

    client.Job.progress(12345, callback(err, data));

List jobs. By default this returns the last 50 jobs, but this can be altered in an optional params hash.

    client.Job.list(callback(err, data));

    // With optional params hash
    client.Job.list({per_page: 5, page: 3}, callback(err, data));

Cancel a job

    client.Job.cancel(12345, callback);

Resubmit a job

    client.Job.resubmit(12345, callback);