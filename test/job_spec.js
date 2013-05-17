var nock = require('nock')
  , scopes = require('./scopes.js')
  , expect = require('chai').expect
  , Zencoder = require('../index');

var scope = nock('https://app.zencoder.com')
              .matchHeader('Zencoder-Api-Key', '1234567abcde')
              .post('/api/v2/jobs')
              .reply(201, scopes.job.create)
              .get('/api/v2/jobs/1234')
              .reply(200, scopes.job.details)
              .put('/api/v2/jobs/12345/cancel')
              .reply(204)
              .put('/api/v2/jobs/123456/resubmit')
              .reply(204)
              .put('/api/v2/jobs/32123/finish')
              .reply(204)
              .get('/api/v2/jobs')
              .reply(200, scopes.job.list)
              .get('/api/v2/jobs?per_page=1')
              .reply(200, scopes.job.listLimit)
              .get('/api/v2/jobs/5432/progress')
              .reply(200, scopes.job.progress);

describe('The Zencoder REST Client Job resource', function () {

  var client = new Zencoder('1234567abcde');

  it('should create a new job', function(done) {
    client.Job.create({
      input: 's3://zencodertesting/test.mov'
    }, function(err, data, response){
      expect(response.statusCode).to.equal(201);
      expect(data.id).to.be.above(0);
      expect(data.outputs.length).to.equal(1);
      done();
    });
  });

  it('should return job details', function(done) {
    client.Job.details(1234, function(err, data, response){
      expect(response.statusCode).to.equal(200);
      expect(data.job.id).to.be.above(0);
      expect(data.job.output_media_files.length).to.equal(1);
      done();
    });
  });

  it('should cancel a job', function(done) {
    client.Job.cancel(12345, function(err, data, response){
      expect(response.statusCode).to.equal(204);
      done();
    });
  });

  it('should resubmit a job', function(done) {
    client.Job.resubmit(123456, function(err, data, response) {
      expect(response.statusCode).to.equal(204);
      done();
    });
  });

  it('should finish a live job', function(done) {
    client.Job.finish(32123, function(err, data, response) {
      expect(response.statusCode).to.equal(204);
      done();
    })
  });

  describe('list', function() {
    it('should return recent jobs', function(done) {
      client.Job.list(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data.length).to.equal(3);
        done();
      })
    });

    it('should return a limited set of recent jobs', function(done) {
      client.Job.list(function(err, data, response) {
        expect(response.statusCode).to.equal(200);
        expect(data.length).to.equal(1);
        done();
      }, {per_page: 1})
    })
  });

  it('should return progress of a job', function(done) {
    client.Job.progress(5432, function(err, data, response) {
      expect(response.statusCode).to.equal(200);
      expect(data.state).to.equal('processing');
      expect(data.outputs.length).to.equal(1);
      done();
    })
  })
});