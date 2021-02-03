/**
 * @module zencoder
 * @author Matthew McClure <mmcclure@brightcove.com>
 **/

var request = require('request')
  , packageInfo = require('../package.json')
  , job = require('./resources/job')
  , input = require('./resources/input')
  , output = require('./resources/output')
  , report = require('./resources/report')
  , account = require('./resources/account');


function initializer(key, base_url, options) {
  // Just in case they forgot new.
  if (!(this instanceof initializer)) return new initializer(key, base_url, options);

  // Required client config
  if (!key){
    if (process.env.ZENCODER_API_KEY){
      this.apiKey = process.env.ZENCODER_API_KEY;
    }
  } else {
    this.apiKey = key;
  }

  // set base_url if not in initializer
  this.baseUrl = base_url || 'https://app.zencoder.com/api/v2';

  // options
  if (options) {
    this.options = {};
    options.timeout ? this.options.timeout = options.timeout : null;
  }

  initializer.prototype.Job = job(this);
  initializer.prototype.Input = input(this);
  initializer.prototype.Output = output(this);
  initializer.prototype.Report = report(this);
  initializer.prototype.Account = account(this);

  return this;
}

function parseResponse(err, response, body){
  var data;
  if (!body) {
    data = err;
  } else {
    try {
      data = JSON.parse(body);
    } catch(e) {
      data = body;
    }
  }

  //request doesn't think 4xx is an error - we want an error for any non-2xx status codes
  //we also we want this to be a real error object...
  if (!err && (response.statusCode < 200 || response.statusCode > 206)){
    err = new Error('HTTP request error. Check errors object.');
    if (typeof data === 'object' && data !== null) {
      err.errors = data.errors;
    }
    err.code = response.statusCode;
  }

  if(err && typeof err === 'string') {
    err = new Error(err);
    err.code = response.statusCode;
  }
  return {err: err, response: response, data: data};
}

initializer.prototype._request = function (method, path, params, body, callback){
  var client = this;

  var options;

  options = {
    method: method,
    qs: params,
    uri: client.baseUrl + path,
    json: body
  };

  if (client.options) {
    options.timeout = client.options.timeout
  }

  //Prepare request options
  options.headers = {
    'Accept':'application/json',
    'Zencoder-Api-Key': this.apiKey,
    'User-Agent':'Zencoder-Node v' + packageInfo.version
  };

  //Initiate HTTP request
  return callback 
  ? request(options, function(err, response, body) {
      var parsed = parseResponse(err, response, body)

      return callback(parsed.err, parsed.data, parsed.response)
    })
  : new Promise(function(resolve, reject) {
      request(options, function(err, response, body) {
        var parsed = parseResponse(err, response, body)

        return parsed.err
        ? reject(parsed.err)
        : resolve({response: parsed.response, data: parsed.data})
      })
    })
}
initializer.prototype.get = function(path, callback, params) {
  var params = params || {}
  return this._request('GET', path, params, null, callback);
};

initializer.prototype.post = function(path, body, callback) {
  var body = body || null;
  return this._request('POST', path, null, body, callback);
};

initializer.prototype.put = function(path, callback, body) {
  var body = body || null;
  return this._request('PUT', path, null, body, callback);
};

module.exports = initializer;
