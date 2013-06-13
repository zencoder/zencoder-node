var libpath = process.env['ZENCODER_NODE_COV'] ? './lib-cov' : './lib';

module.exports = require(libpath);