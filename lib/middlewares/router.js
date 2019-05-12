import express from 'express';

/**
 * Loads routes definition, and binds them to app reference
 * 
 * @param {object} app Express app
 */
export default app => {
  app.routes = express.Router();
  const route = require(`${app.baseDir}/routes`).default;

  route(app);
  return app.routes;
};