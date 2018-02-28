const Express = require('express');
const router = require('./middleware/router');
const services = require('./middleware/service');
const path = require('path');
const { loadControllers, loadConfig } = require('./loader');

class Xprez extends Express {
  constructor(props) {
    super(props);

    this.controllers = {};
    loadControllers().forEach((item) => this.controllers[item.name] = new (item.module)(this));

    this.config = {};
    loadConfig().forEach((config) => this.config = { ...this.config, ...config.module });

    this.use(services);
    this.use(router(this));

    this.set('view', path.join(__dirname, '../views'));
  }
}

module.exports = Xprez;
