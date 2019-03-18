import bodyParser from './body-parser';
import router from './router';
import logger from './logging';

const useMiddleware = (app, middleware) => {
  const fn = app.middlewares[middleware];
  app.use(fn);
};

/**
 * Configure middlewares for app.
 */
export default (app, beforeMiddlewares, afterMiddlewares) => {
  bodyParser(app);
  logger(app);

  // middlewares before request
  beforeMiddlewares.forEach((middleware) => useMiddleware(app, middleware));

  // set router
  const routes = router(app);
  app.use(routes);

  // middlewares after request
  afterMiddlewares.forEach((middleware) => useMiddleware(app, middleware));
};