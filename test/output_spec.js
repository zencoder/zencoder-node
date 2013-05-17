var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .get('/api/v2/outputs/15432')
              .reply(200, scopes.output.details)
              .get('/api/v2/outputs/14325/progress')
              .reply(200, scopes.output.progress);

describe('The Zencoder REST Client Input resource', function () {

  var client = new Zencoder('1234567abcde');

  it('should return details about an output', function(done) {
    client.Output.details(15432, function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      expect(data.id).to.be.above(0);
      done();
    });
  });

  it('should return progress about an output', function(done) {
    client.Output.progress(14325, function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      expect(data.state).to.equal('processing');
      done();
    })
  })
});