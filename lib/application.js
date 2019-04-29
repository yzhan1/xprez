import Express from 'express';
import path from 'path';

import load from './loader';
import setMiddlewares from './middlewares';
import { Controller, Service } from './modules';

class Application extends Express {

  /**
   * App constructor.
   * 
   * Binds all user objects, controllers, config and services to 
   * app object. Also sets the view folder and public folder.
   * 
   * @constructor
   * @param {object} dict A set of objects user would like to access in Controllers & Services
   */
  constructor(dict = {}) {
    super();

    this.baseDir = dict['baseDir'];
    this.env = process.env.NODE_ENV || 'development';
    this.userBindings = dict['binds'];

    const hash = {
      '../config': (this.config = {}),
      '../app/utils': (this.utils = {}),
      '../app/middlewares': (this.middlewares = {}),
      // need an instance starting from here
      '../app/services': (this.services = {}),
      '../app/controllers': (this.controllers = {})
    };

    Object.keys(hash).forEach((folder, index) => {
      load(path.join(this.baseDir, folder)).forEach((item) => {
        if (!item.module) return;
        hash[folder][item.name] = index <= 2 ? item.module : new (item.module)(this);
      });
    });

    Object.entries(hash['../app/controllers']).forEach(([_, obj]) => {
      Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
        .filter((prop) => typeof obj[prop] === 'function')
        .forEach((fn) => obj[fn] = obj[fn].bind(obj));
    });

    this.config = this.config.config;
    delete this.config.config;

    this.set('views', path.join(this.baseDir, '../app/views'));
    this.use(Express.static(path.join(this.baseDir, '../app/public')));

    const beforeMiddlewares = dict['beforeMiddlewares'] ? dict['beforeMiddlewares'] : [];
    const afterMiddlewares = dict['afterMiddlewares'] ? dict['afterMiddlewares'] : [];
    setMiddlewares(this, beforeMiddlewares, afterMiddlewares);
  }
}

export {
  Application as App,
  Controller,
  Service
};
