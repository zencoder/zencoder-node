module.exports = function(client) {
  var route = '/inputs';
  var Input = {
    details: function(id, callback) {
      if (!id) { var error = { errors: [ 'Input ID required' ] }; return callback(error) }
      client.get(route + '/' + id, callback);
    },
    progress: function(id, callback) {
      if (!id) { var error = { errors: [ 'Input ID required' ] }; return callback(error) }
      client.get(route + '/' + id + '/progress', callback)
    }
  }

  return Input;
}