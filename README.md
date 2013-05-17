Zencoder
----

NPM package for interacting with the Zencoder API.

Requires Node.js >= 0.8

### Getting Started

Install the NPM package

    $ npm install zencoder-dev

Require the package in your application

    var Zencoder = require('zencoder-dev');

Instantiate a new client. This will accept an API Key and a Base URL. If no API key is set, it will look for a `ZENCODER_API_KEY` environment variable. Base URL defaults to `https://app.zencoder.com/api/v2`.

    var client = new Zencoder('API KEY');

### Usage

The library follows the API's REST conventions as closely as possible.

To create a new job:

    client.Job.create({input: 'http://s3.amazonaws.com/zencodertesting/test.mov'}, function(err, data) {
      if (err) {
        // something went wrong
        console.log(err);
      }
      // all's well. do something with the response.
      console.log(data);
    });

Get details about a job

    client.Job.details(12345, callback);

Get progress on a job

    client.Job.progress(12345, callback);

List jobs. By default this returns the last 50 jobs, but this can be altered in the params hash.

    client.Job.list(callback, {per_page: 5, page: 3});

Cancel a job

    client.Job.cancel(12345, callback);

Resubmit a job

    client.Job.resubmit(12345, callback);

The other endpoints follow the same conventions, but if you'd like to see more examples, check out the tests.

### Notes

This library is still very much under development. It will be moving to `zencoder` as soon as possible as a beta, but be aware that the API could (read: will) change before we release as production. Along those lines, if you see things about the API you don't like, please [reach out](mailto: matt@zencoder.com)