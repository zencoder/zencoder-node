module.exports = function(client) {
  var route = '/account';
  var Account = {
    create: function(body, callback) {
      return client.post(route, body, callback);
    },
    details: function(callback) {
      return client.get(route, callback);
    },
    integration: function(callback) {
      return client.put(route + '/integration', callback);
    },
    live: function(callback) {
      return client.put(route + '/live', callback);
    }
  }

  return Account;
}