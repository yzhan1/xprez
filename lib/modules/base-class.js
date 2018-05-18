'use strict';

/**
 * Base Class for Controllers and Services to extend from.
 */
class BaseClass {

  /**
   * Binds config, services and other user specified objects.
   * 
   * @constructor
   * @param {object} app Reference to the Express app object
   */
  constructor(app) {
    const { config, services, userBindings } = app;

    this.config = config;
    this.services = services;

    Object.entries(userBindings).forEach(([key, value]) => {
      key = key.toLowerCase();

      if (key.match(/^(config|services|controllers)$/)) {
        throw 'InvalidBindKeyError';
      }
      this[key] = value;
    });
  }
}

module.exports = BaseClass;