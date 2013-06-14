var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .get('/api/v2/account')
              .reply(200, scopes.accounts.details);

describe('The Zencoder REST Client setup', function () {

  it('should use an environment variable if API key is not included', function(done) {
    process.env.ZENCODER_API_KEY = '1234567abcde';
    var client = new Zencoder();
    client.Account.details(function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});