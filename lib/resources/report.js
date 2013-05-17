module.exports = function(client) {
  var route = '/reports'
  var Report = {
    vod: function(callback, params) {
      client.get(route + '/vod', callback, params);
    },
    live: function(callback, params) {
      client.get(route + '/live', callback, params);
    },
    all: function(callback, params) {
      client.get(route + '/all', callback, params);
    },
    minutes: function(callback, params) {
      client.get(route + '/minutes', callback, params);
    }
  }

  return Report;
}