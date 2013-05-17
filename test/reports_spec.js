var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .get('/api/v2/reports/vod')
              .reply(200, scopes.reports.default_vod)
              .get('/api/v2/reports/live')
              .reply(200, scopes.reports.default_live)
              .get('/api/v2/reports/all')
              .reply(200, scopes.reports.default_all)
              .get('/api/v2/reports/minutes')
              .reply(200, scopes.reports.default_vod); // vod and minutes return the same response

describe('The Zencoder REST Client Report resource', function () {

  var client = new Zencoder('1234567abcde');

  describe('vod', function() {
    it('should return usage', function(done) {
      client.Report.vod(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data.total.encoded_minutes).to.equal(6);
        expect(data.total.billable_minutes).to.equal(8);
        done();
      });
    });
  });

  describe('live', function() {
    it('should return usage', function(done) {
      client.Report.live(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data.total.stream_hours).to.equal(5);
        expect(data.total.encoded_hours).to.equal(5);
        expect(data.statistics.length).to.equal(2);
        done();
      });
    });
  });

  describe('all', function() {
    it('should return usage', function(done) {
      client.Report.all(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data.total.live.stream_hours).to.equal(5);
        expect(data.total.live.encoded_hours).to.equal(5);
        expect(data.total.vod.encoded_minutes).to.equal(6);
        expect(data.total.vod.billable_minutes).to.equal(8);
        expect(data.statistics.live.length).to.equal(2);
        done();
      });
    });
  });

  describe('minutes', function() {
    it('should return usage', function(done) {
      client.Report.minutes(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data.total.encoded_minutes).to.equal(6);
        expect(data.total.billable_minutes).to.equal(8);
        done();
      });
    });
  });
});