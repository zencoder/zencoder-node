var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

// Second time through for each for an empty params block. eventually we should include actual parameters.

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .get('/api/v2/reports/vod')
              .reply(200, scopes.reports.default_vod)
              .get('/api/v2/reports/vod')
              .reply(200, scopes.reports.default_vod)
              .get('/api/v2/reports/live')
              .reply(200, scopes.reports.default_live)
              .get('/api/v2/reports/live')
              .reply(200, scopes.reports.default_live)
              .get('/api/v2/reports/all')
              .reply(200, scopes.reports.default_all)
              .get('/api/v2/reports/all')
              .reply(200, scopes.reports.default_all)
              .get('/api/v2/reports/minutes')
              .reply(200, scopes.reports.default_vod); // vod and minutes return the same response

describe('The Zencoder REST Client Report resource', function () {

  var client = new Zencoder('1234567abcde');

  describe('vod', function() {
    it('should return usage when just a callback is specified', function(done) {
      client.Report.vod(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.property('total');
        expect(data).to.have.deep.property('total.encoded_minutes');
        expect(data).to.have.deep.property('total.billable_minutes');
        done();
      });
    });

    it('should return usage when params and callback are specified', function(done) {
      client.Report.vod({}, function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.deep.property('total.encoded_minutes');
        expect(data).to.have.deep.property('total.billable_minutes');
        done();
      });
    });
  });

  describe('live', function() {
    it('should return usage when just a callback is specified', function(done) {
      client.Report.live(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.deep.property('total.stream_hours');
        expect(data).to.have.deep.property('total.encoded_hours');
        expect(data).to.have.property('statistics');
        done();
      });
    });

    it('should return usage when params and callback are specified', function(done) {
      client.Report.live({}, function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.deep.property('total.stream_hours');
        expect(data).to.have.deep.property('total.encoded_hours');
        expect(data).to.have.property('statistics');
        done();
      });
    });
  });

  describe('all', function() {
    it('should return usage when just a callback is specified', function(done) {
      client.Report.all(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.deep.property('total.live.stream_hours');
        expect(data).to.have.deep.property('total.live.encoded_hours');
        expect(data).to.have.deep.property('total.vod.encoded_minutes');
        expect(data).to.have.deep.property('total.vod.billable_minutes');
        expect(data).to.have.property('statistics');
        done();
      });
    });

    it('should return usage when params and callback are specified', function(done) {
      client.Report.all({}, function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.deep.property('total.live.stream_hours');
        expect(data).to.have.deep.property('total.live.encoded_hours');
        expect(data).to.have.deep.property('total.vod.encoded_minutes');
        expect(data).to.have.deep.property('total.vod.billable_minutes');
        expect(data).to.have.property('statistics');
        done();
      });
    });
  });

  describe('minutes', function() {
    it('should return usage', function(done) {
      client.Report.minutes(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data).to.have.property('total');
        expect(data).to.have.deep.property('total.encoded_minutes');
        expect(data).to.have.deep.property('total.billable_minutes');
        done();
      });
    });
  });
});