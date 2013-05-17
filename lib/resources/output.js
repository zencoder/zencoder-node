module.exports = function(client) {
  var route = '/outputs'
  var Output = {
    details: function(id, callback) {
      if (!id) { var error = { errors: [ 'Output ID required' ] }; return callback(error) }
      client.get(route + '/' + id, callback);
    },
    progress: function(id, callback) {
      if (!id) { var error = { errors: [ 'Output ID required' ] }; return callback(error) }
      client.get(route + '/' + id + '/progress', callback)
    }
  }

  return Output;
}