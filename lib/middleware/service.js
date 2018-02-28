const { loadServices } = require('../loader/index');
const services = {};

loadServices().forEach((service) => services[service.name] = new (service.module)());

const setup = (req, res, next) => {
  req.services = services;
  next();
};

module.exports = setup;
