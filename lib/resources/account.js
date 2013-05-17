module.exports = function(client) {
  var route = '/accounts';
  var Account = {
    create: function(body, callback) {
      client.post(route, body, callback);
    },
    details: function(callback) {
      client.get(route, callback);
    },
    integration: function(callback) {
      client.put(route + '/integration', callback);
    },
    live: function(callback) {
      client.put(route + '/live', callback);
    }
  }

  return Account;
}