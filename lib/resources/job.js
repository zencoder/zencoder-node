module.exports = function(client) {
  var route = '/jobs'
  var Job = {
    create: function(body, callback) {
      client.post(route, body, callback);
    },
    details: function(id, callback) {
      // Validate that an ID is passed, because otherwise they just get the list of jobs
      if (!id) { var error = { errors: [ 'Job ID required' ] }; return callback(error) }
      client.get(route + '/' + id, callback);
    },
    cancel: function(id, callback) {
      if (!id) { var error = { errors: [ 'Job ID required' ] }; return callback(error) }
      client.put(route + '/' + id + '/cancel', callback);
    },
    resubmit: function(id, callback) {
      if (!id) { var error = { errors: [ 'Job ID required' ] }; return callback(error) }
      client.put(route + '/' + id + '/resubmit', callback)
    },
    finish: function(id, callback) {
      if (!id) { var error = { errors: [ 'Job ID required' ] }; return callback(error) }
      client.put(route + '/' + id + '/finish', callback)
    },
    list: function(callback, params) {
      client.get(route, callback, params)
    },
    progress: function(id, callback) {
      if (!id) { var error = { errors: [ 'Job ID required' ] }; return callback(error) }
      client.get(route + '/' + id + '/progress', callback)
    }
  }

  return Job;
}