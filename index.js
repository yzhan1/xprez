require('babel-register')({
  presets: ['env']
});

module.exports = require('./lib/application');