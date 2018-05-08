const Express = require('express');
const path = require('path');
const ejs = require('ejs');

const router = require('./middleware/router');
const modules = require('./modules');
const load = require('./loader');

class Xprez extends Express {

  /**
   * App constructor.
   * 
   * Binds all user objects, controllers, config and services to 
   * app object. Also sets view engine and view folder
   * 
   * @constructor
   * @param {string} folderPath Path to the `src` folder
   * @param {object} binds A set of objects user would like to access in Controllers & Services
   */
  
  constructor(folderPath, binds = {}) {
    super();

    this.userBindings = binds;

    const hash = {
      '../config': (this.config = {}),
      '../services': (this.services = {}),
      '../controllers': (this.controllers = {})
    };

    Object.keys(hash).forEach((folder, index) => {
      load(path.join(folderPath, folder)).forEach((item) => {
        hash[folder][item.name] = index === 0 ? item.module : new (item.module)(this);
      });
    });

    this.set('view engine', 'ejs');
    this.set('views', path.join(folderPath, '../views'));

    this.use(router(this, folderPath));
  }
}

module.exports = {
  Xprez,
  Controller: modules.Controller,
  Service: modules.Service
};
