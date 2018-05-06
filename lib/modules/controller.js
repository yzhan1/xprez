/**
 * Controller class to inherit from.
 * It binds the config and services hashes,
 * so that they can be accessed in Controllers.
 */
class Controller {
  constructor(app) {
    const { config, services } = app;
    this.config = config;
    this.services = services;
  }
}

module.exports = Controller;