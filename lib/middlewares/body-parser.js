import bodyParser from 'body-parser';

export default app => {
  // use bodyParser for getting request data
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};