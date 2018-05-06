/**
 * Service class to inherit from.
 * It binds the config hash,
 * so that it can be accessed in Services.
 */
class Service {
  constructor(app) {
    this.config = app.config;
  }
}

module.exports = Service;