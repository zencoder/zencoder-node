var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var apiKey = '1234567abcde';

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', apiKey)
              .get('/api/v2/account').times(2)
              .reply(200, scopes.accounts.details)
              .post('/api/v90/jobs')
              .reply(301, scopes.moved_permanently);

describe('The Zencoder REST Client setup', function () {

  it('should not require new', function(done) {
    process.env.ZENCODER_API_KEY = apiKey;
    var client = Zencoder();
    expect(client.apiKey).to.equal(apiKey);
    client.Account.details(function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should use an environment variable if API key is not included', function(done) {
    process.env.ZENCODER_API_KEY = apiKey;
    var client = new Zencoder();
    expect(client.apiKey).to.equal(apiKey);
    client.Account.details(function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should use default base url if not specified', function() {
    var client = new Zencoder(apiKey);
    expect(client.baseUrl).to.equal('https://app.zencoder.com/api/v2');
  });

  it('should use different base url if specified', function() {
    var newBase = 'https://app.zencoder.com/api/v3';
    var client = new Zencoder(apiKey, newBase);
    expect(client.baseUrl).to.equal(newBase);
  });

  it('should adjust timeout if timeout specified in options', function() {
    var options = {timeout: 5000};
    var client = new Zencoder(apiKey, null, {timeout: 5000});
    expect(client.options.timeout).to.equal(5000);
  });

  it('should return an error object as error param', function() {
    var client = new Zencoder(apiKey, 'https://app.zencoder.com/api/v90');
    client.Job.create({}, function(err) {
      expect(err.name).to.equal('Error')
    });
  });

  it('should return a promise if no callback is supplied', function() {
    process.env.ZENCODER_API_KEY = apiKey;
    var client = new Zencoder();
    expect(client.Account.details().constructor).to.equal(Promise)
  })

});
