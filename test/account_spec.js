var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .post('/api/v2/account')
              .reply(201, scopes.accounts.create)
              .get('/api/v2/account')
              .reply(200, scopes.accounts.details)
              .put('/api/v2/account/integration')
              .reply(204)
              .put('/api/v2/account/live')
              .reply(204);

describe('The Zencoder REST Client account resource', function () {
  var client;

  beforeEach(function() {
    client = new Zencoder('1234567abcde');
  });

  it('should create a new account', function(done) {
    client.Account.create({email: 'herpderp@example.com', terms_of_service: 1}, function(err, data, response) {
      if(response){
        expect(response.statusCode).to.equal(201);
      }
      expect(data).to.have.property('api_key');
      expect(data).to.have.property('password');
      done();
    });
  });

  it('should return details about an account', function(done) {
    client.Account.details(function(err, data, response) {
      if(response){
        expect(response.statusCode).to.equal(200);
      }
      expect(data).to.have.property('account_state');
      expect(data).to.have.property('minutes_included');
      done();
    });
  });

  it('should turn on integration mode', function(done) {
    client.Account.integration(function(err, data, response) {
      if(response){
        expect(response.statusCode).to.equal(204);
      }
      done();
    })
  });

  it('should turn off integration mode', function(done) {
    client.Account.live(function(err, data, response) {
      if(response){
        expect(response.statusCode).to.equal(204);
      }
      done();
    })
  });
});
