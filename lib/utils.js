var utils = {
  // checkParams can be really simple since params are really only included on GET requests (so just params and callback)
  checkParams: function checkParams (args) {
    var options = {};
    // if there's only one argument and it's a function...
    if (args.length == 1) {
      // and that argument is a function...it's the callback
      if (typeof(args[0]) == 'function') {
        options.callback = args[0]
      // otherwise it's the params block...making for a pretty useless reporting call
      } else if (typeof(args[0]) == 'object') {
        options.params = args[0]
      }
    } else if (args.length == 2) {
      // There are two arguments, so do a quick check and make sure they're what we think they are and move on
      if (typeof(args[0]) == 'object') {
        options.params = args[0];
      }
      if (typeof(args[1]) == 'function') {
        options.callback = args[1];
      }
    }
    // return the options block
    return options;
  }
}

module.exports = utils;