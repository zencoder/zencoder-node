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


function initializer(key, base_url) {
  // Required client config
  if (!key){
    if (process.env.ZENCODER_API_KEY){
      this.apiKey = process.env.ZENCODER_API_KEY;
    } else {
      throw 'Client requires an API key to be set explicitly or via the ZENCODER_API_KEY environment variable';
    }
  } else {
    this.apiKey = key;
  }

  // set base_url if not in initializer
  this.baseUrl = base_url || 'https://app.zencoder.com/api/v2';

  initializer.prototype.Job = job(this);
  initializer.prototype.Input = input(this);
  initializer.prototype.Output = output(this);
  initializer.prototype.Report = report(this);
  initializer.prototype.Account = account(this);

  return this;
}

initializer.prototype._request = function (method, path, params, body, callback){
  var client = this;

  var options;

  options = {
    method: method,
    qs: params,
    uri: this.baseUrl + path,
    json: body
  }

  //Prepare request options
  options.headers = {
    'Accept':'application/json',
    'Zencoder-Api-Key': this.apiKey,
    'User-Agent':'Zencoder-Node v' + packageInfo.version
  };

  //Initiate HTTP request
  request(options, function (err, response, body){
    if (callback) {
      if (!body) {
        data = err;
      } else {
        try {
          var data = JSON.parse(body)
        } catch(e) {
          var data = body;
        }
      }

      //request doesn't think 4xx is an error - we want an error for any non-2xx status codes
      if (!err && (response.statusCode < 200 || response.statusCode > 206)){
        err = data ? data : {
          status: response.statusCode,
          message:'HTTP request error. Check Response'
        };
      }

      callback(err, data, response);
    }
    return this;
  });
};

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