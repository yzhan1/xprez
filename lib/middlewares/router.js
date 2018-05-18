'use strict';

const express = require('express');
const morgan = require('morgan');

/**
 * Iterates through each defined routes and configures the
 * Express router based on the specified HTTP methods 
 * and callback functions.
 * 
 * @param {object} app The Express app object reference
 * @param {string} folderPath File path of 'src/config/routes.js'
 */
const router = (app, folderPath) => {
  app.use(morgan('common'));

  const router = express.Router();
  const routes = require(folderPath + '/routes')(app);

  Object.entries(routes).forEach(([key, callback]) => {
    const [action, endpoint] = key.split(' ');

    router[action](endpoint, callback);
  });

  return router;
};

module.exports = router;
