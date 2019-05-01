import Express from 'express';
import path from 'path';

import load from './loader';
import setMiddlewares from './middlewares';
import { Controller, Service } from './modules';

const
  CONFIG_PATH = '../config',
  UTILS_PATH = '../app/utils',
  MIDDLEWARES_PATH = '../app/middlewares',
  SERVICES_PATH = '../app/services',
  CONTROLLERS_PATH = '../app/controllers';

const needInstance = [SERVICES_PATH, CONTROLLERS_PATH];

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

    const hash = {};
    hash[CONFIG_PATH] = this.config = {};
    hash[UTILS_PATH] = this.utils = {};
    hash[MIDDLEWARES_PATH] = this.middlewares = {};
    hash[SERVICES_PATH] = this.services = {};
    hash[CONTROLLERS_PATH] = this.controllers = {};

    Object.keys(hash).forEach((folder, _) => {
      load(path.join(this.baseDir, folder)).forEach((item) => {
        if (!item.module) return;
        hash[folder][item.name] = needInstance.includes(folder) ? new (item.module)(this) : item.module;
      });
    });

    needInstance.forEach((key) => {
      Object.entries(hash[key]).forEach(([_, obj]) => {
        Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
          .filter((prop) => typeof obj[prop] === 'function')
          .forEach((fn) => obj[fn] = obj[fn].bind(obj));
      });
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
