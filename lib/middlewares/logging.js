import morgan from 'morgan';
import addRequestId from 'express-request-id';

morgan.token('id', (req) => req.id.split('-')[0]);

export default (app) => {
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
};