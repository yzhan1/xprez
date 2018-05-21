require('babel-register')({
  presets: ['env'],
  ignore: false
});

module.exports = require('./lib/application');