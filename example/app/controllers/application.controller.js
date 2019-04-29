import { Controller } from '../../..';

class ApplicationController extends Controller {
  constructor(app) {
    super(app);
    // binds to be used in controller layer
    this.rpcClient = 'RPC Client';
  }

  index(req, res, next) {
    res.render('index', { greeting: 'Hello' });
    next();
  }
}

export default ApplicationController;
