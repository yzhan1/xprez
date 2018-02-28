const express = require('express');
const router = require('./middleware/router');
const services = require('./middleware/service');
const { loadControllers } = require('./loader');

class Xprez extends express {
  constructor(props) {
    super(props);

    this.controllers = {};
    loadControllers().forEach((item) => this.controllers[item.name] = new (item.module)());

    this.use(services);
    this.use(router(this));
  }
}

module.exports = Xprez;
