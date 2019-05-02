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
  CONTROLLERS_PATH = '../app/controllers',
  VIEWS_PATH = '../app/views',
  PUBLIC_PATH = '../app/public';

const
  BINDS_KEY = 'binds',
  BASEDIR_KEY = 'baseDir',
  BEFORE_MIDDLEWARES_KEY = 'beforeMiddlewares',
  AFTER_MIDDLEWARES_KEY = 'afterMiddlewares';

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

    this.baseDir = dict[BASEDIR_KEY];
    this.env = process.env.NODE_ENV || 'development';
    this.userBindings = dict[BINDS_KEY];

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

    this.set('views', path.join(this.baseDir, VIEWS_PATH));
    this.use(Express.static(path.join(this.baseDir, PUBLIC_PATH)));

    const beforeMiddlewares = dict[BEFORE_MIDDLEWARES_KEY] ? dict[BEFORE_MIDDLEWARES_KEY] : [];
    const afterMiddlewares = dict[AFTER_MIDDLEWARES_KEY] ? dict[AFTER_MIDDLEWARES_KEY] : [];
    setMiddlewares(this, beforeMiddlewares, afterMiddlewares);
  }
}

export {
  Application as App,
  Controller,
  Service
};
