var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .get('/api/v2/inputs/15432')
              .reply(200, scopes.input.details)
              .get('/api/v2/inputs/14325/progress')
              .reply(200, scopes.input.progress);

describe('The Zencoder REST Client Input resource', function () {

  var client = new Zencoder('1234567abcde');

  it('should return details about an input', function(done) {
    client.Input.details(15432, function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      expect(data.id).to.be.above(0);
      done();
    });
  });

  it('should return progress about an input', function(done) {
    client.Input.progress(14325, function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      expect(data.state).to.equal('processing');
      done();
    })
  })
});