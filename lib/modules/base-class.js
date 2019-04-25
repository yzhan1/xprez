/**
 * Base Class for Controllers and Services to extend from.
 */
export default class BaseClass {

  /**
   * Binds config, services, utils and other user specified objects.
   * 
   * @constructor
   * @param {object} app Reference to the Express app object
   */
  constructor(app) {
    const {
      config, services, userBindings, env, utils
    } = app;

    this.config = config.config;
    this.services = services;
    this.env = env;
    this.utils = utils;

    Object.entries(userBindings).forEach(([key, value]) => {
      const lowerCasedKey = key.toLowerCase();

      // cannot use reserved keywords
      if (lowerCasedKey.match(/^(config|services|controllers|middlewares|utils)$/)) {
        throw new Error('InvalidBindKeyError');
      }
      this[key] = value;
    });
  }
}
