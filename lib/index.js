const Express = require('express');
const router = require('./middleware/router');
const services = require('./middleware/service');
const config = require('./middleware/config');
const path = require('path');
const { loadControllers, loadConfig } = require('./loader');

class Xprez extends Express {
  constructor(props) {
    super(props);

    this.controllers = {};
    loadControllers().forEach((item) => this.controllers[item.name] = item.module);

    this.use(services);
    this.use(config);
    this.use(router(this));
  }
}

module.exports = Xprez;
