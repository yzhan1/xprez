const { loadConfig } = require('../loader/index');
const config = {};

loadConfig().forEach((cfg) => config[cfg.name] = cfg.module);

const setup = (req, res, next) => {
  req.config = config;
  next();
};

module.exports = setup;