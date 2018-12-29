import { Controller } from 'xprez';

class HelloController extends Controller {
  index(req, res) {
    res.render('index', { greeting: 'Hello' });
  }
}

export default HelloController;