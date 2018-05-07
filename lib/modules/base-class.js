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
    const { config, services } = app;

    this.config = config;
    this.services = services;

    Object.entries(app.userBindings).forEach(([key, value]) => {
      if (key !== 'config' && key !== 'services') {
        this[key] = value;
      }
    });
  }
}

module.exports = BaseClass;