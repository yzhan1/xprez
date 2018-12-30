import bodyParser from './body-parser';
import router from './router';
import logger from './logging';

/**
 * Configure middlewares for app.
 */
export default (app, beforeMiddlewares, afterMiddlewares) => {
  bodyParser(app);
  logger(app);

  // middlewares before request
  beforeMiddlewares.forEach((middleware) => {
    const fn = app.middlewares[middleware];
    app.use(fn);
  });

  // set router
  const routes = router(app);
  app.use(routes);

  // middlewares after request
  afterMiddlewares.forEach((middleware) => {
    const fn = app.middlewares[middleware];
    app.use(fn);
  });
};