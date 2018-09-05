import express from 'express';
import morgan from 'morgan';

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

  require(folderPath + '/routes').default(app);
  return app.routes;
};

export default router;
