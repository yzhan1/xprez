const express = require('express');
const morgan = require('morgan');
const path = require('path');

/**
 * Iterates through each defined routes and configures the
 * Express router based on the specified HTTP methods 
 * and callback functions.
 * 
 * @param {object} app The Express app object reference.
 * @param {string} filePath File path of 'src/config/routes.js'.
 */
const configureRouter = (app, filePath) => {
  app.use(morgan('common'));

  const router = express.Router();
  const routes = require(path.join(filePath + '/routes'))(app);

  Object.keys(routes).forEach((key) => {
    const [action, endpoint] = key.split(' ');
    const method = routes[key];

    setRoute(router, action, endpoint, method);
  });

  return router;
};

/**
 * Configures the router.
 * 
 * @param {object} router Router reference
 * @param {string} action Route's HTTP method
 * @param {string} endpoint Route's endpoint
 * @param {Function} callback Callback function for this route
 */
const setRoute = (router, action, endpoint, callback) => {
  switch (action) {
    case 'get':
      router.get(endpoint, callback);
      break;
    case 'post':
      router.post(endpoint, callback);
      break;
    case 'put':
      router.put(endpoint, callback);
      break;
    case 'delete':
      router.delete(endpoint, callback);
      break;
    case 'patch':
      router.patch(endpoint, callback);
      break;
    default:
      throw 'HTTPMethodUnrecognized';
  }
};

module.exports = (app, filePath) => configureRouter(app, filePath);
