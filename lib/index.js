const Express = require('express');
const path = require('path');
const ejs = require('ejs');
const router = require('./middleware/router');
const modules = require('./modules');
const load = require('./loader');

/**
 * Main Constructor.
 * 
 * Loads all controllers, services and configs and binds them
 * to the app object. Also sets the view engine and view folder
 */
class Xprez extends Express {
  constructor(props) {
    super(props);

    this.controllers = {}, this.services = {}, this.config = {};

    const hash = {
      '../config': this.config,
      '../services': this.services,
      '../controllers': this.controllers
    };

    Object.keys(hash).forEach((folder, index) => {
      load(path.join(props, folder)).forEach((item) => {
        hash[folder][item.name] = index === 0 ? item.module : new (item.module)(this);
      });
    });

    this.set('view engine', 'ejs');
    this.set('views', path.join(props, '../views'));

    this.use(router(this, props));
  }
}

module.exports = {
  Xprez,
  modules
}
