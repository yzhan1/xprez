import morgan from 'morgan';
import addRequestId from 'express-request-id';

morgan.token('id', (req) => req.id.split('-')[0]);

/**
 * Loads routes definition, and binds them to app reference
 * with logger configs.
 * 
 * @param {object} app The Express app object reference
 * @param {string} folderPath File path of 'config/routes.js'
 */
const router = (app, folderPath) => {
  app.use(addRequestId());
  
  // no logging for test
  if (app.env !== 'test') {
    app.use(morgan(
      '[:date[iso] #:id] Started :method :url for :remote-addr',
      true
    ));
    app.use(morgan(
      '[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms'
    ));
  }

  require(folderPath + '/routes').default(app);
  return app.routes;
};

export default router;