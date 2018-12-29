import morgan from 'morgan';
import addRequestId from 'express-request-id';

morgan.token('id', (req) => req.id.split('-')[0]);

/**
 * Iterates through each defined routes and configures the
 * Express router based on the specified HTTP methods 
 * and callback functions.
 * 
 * @param {object} app The Express app object reference
 * @param {string} folderPath File path of 'src/config/routes.js'
 */
const router = (app, folderPath) => {
  app.use(addRequestId());
  
  app.use(morgan(
    '[:date[iso] #:id] Started :method :url for :remote-addr',
    true
  ));
  app.use(morgan(
    '[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms'
  ));

  require(folderPath + '/routes').default(app);
  return app.routes;
};

export default router;