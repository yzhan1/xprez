import { Controller } from '../../../../';

class HelloController extends Controller {
  index(req, res) {
    res.render('index', { greeting: 'Hello' });
  }
}

export default HelloController;