import { Controller } from '../../..';

class HelloController extends Controller {
  index(req, res, next) {
    res.render('index', { greeting: 'Hello' });
    next();
  }
}

export default HelloController;
