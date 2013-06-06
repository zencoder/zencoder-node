var checkParams = require('../utils').checkParams;

module.exports = function(client) {
  var route = '/reports'
  var Report = {
    vod: function(/* params, callback */) {
      var options = checkParams(arguments);
      client.get(route + '/vod', options.callback, options.params);
    },
    live: function(/* params, callback */) {
      var options = checkParams(arguments);
      client.get(route + '/live', options.callback, options.params);
    },
    all: function(/* params, callback */) {
      var options = checkParams(arguments);
      client.get(route + '/all', options.callback, options.params);
    },
    minutes: function(/* params, callback */) {
      var options = checkParams(arguments);
      client.get(route + '/minutes', options.callback, options.params);
    }
  }

  return Report;
}