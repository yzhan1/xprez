/**
 * Base Class for Controllers and Services to extend from.
 */
export default class BaseClass {

  /**
   * Binds config, services and other user specified objects.
   * 
   * @constructor
   * @param {object} app Reference to the Express app object
   */
  constructor(app) {
    const { config, services, userBindings, env } = app;

    this.config = config.config;
    this.services = services;
    this.env = env;

    Object.entries(userBindings).forEach(([key, value]) => {
      const lowerCasedKey = key.toLowerCase();
      
      if (lowerCasedKey.match(/^(config|services|controllers)$/)) {
        throw new Error('InvalidBindKeyError');
      }
      this[key] = value;
    });
  }
}
