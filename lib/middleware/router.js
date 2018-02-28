const express = require('express');
const morgan = require('morgan');
const path = require('path');

const configureRouter = (app) => {
  app.use(morgan('common'));
  const router = express.Router();
  const routes = require(path.join('../../../../src/routes'))(app);

  Object.keys(routes).forEach((key) => {
    const [action, endpoint] = key.split(' ');
    const method = routes[key];
    setRoute(router, action, endpoint, method);
  });

  return router;
};

const setRoute = (router, action, url, method) => {
  switch (action) {
    case 'get':
      router.get(url, method);
      break;
    case 'post':
      router.post(url, method);
      break;
    case 'put':
      router.put(url, method);
      break;
    case 'delete':
      router.delete(url, method);
      break;
    case 'patch':
      router.patch(url, method);
      break;
    default:
      console.error('HTTP method unrecognized');
  }
};

const setup = (app) => configureRouter(app);

module.exports = setup;
