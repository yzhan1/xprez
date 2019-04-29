import { Controller } from '../../../..';

class ApplicationController extends Controller {
  constructor(app) {
    super(app);
    this.rpcClient = 'RPC Client';
  }

  index(req, res) {
    res.render('index', { greeting: 'Hello' });
  }
}

export default ApplicationController;
