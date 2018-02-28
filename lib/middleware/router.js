const express = require('express');
const morgan = require('morgan');
const path = require('path');

const configureRouter = (app) => {
  app.use(morgan('common'));

  const router = express.Router();
  const routes = require(path.join('../../../../src/config/routes'))(app);

  Object.keys(routes).forEach((key) => {
    const [action, endpoint] = key.split(' ');
    const method = routes[key];

    setRoute(router, action, endpoint, method);
  });

  return router;
};

const setRoute = (router, action, endpoint, method) => {
  switch (action) {
    case 'get':
      router.get(endpoint, method);
      break;
    case 'post':
      router.post(endpoint, method);
      break;
    case 'put':
      router.put(endpoint, method);
      break;
    case 'delete':
      router.delete(endpoint, method);
      break;
    case 'patch':
      router.patch(endpoint, method);
      break;
    default:
      throw 'HTTPMethodUnrecognizedError';
  }
};

const setup = (app) => configureRouter(app);

module.exports = setup;
