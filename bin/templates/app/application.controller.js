import { Controller } from 'xprez';

class ApplicationController extends Controller {
  constructor(app) {
    super(app);
  }

  index(req, res) {
    res.render('index', { greeting: 'Hello' });
  }
}

export default ApplicationController;
