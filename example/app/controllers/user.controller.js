import { Controller } from '../../..';

class UserController extends Controller {
  index(req, res) {

  }

  show(req, res) {
    // controller has access to binds defined in `config/server.js` and configuration file
    const { services, redis, config } = this;
     
    const uid = req.params.id;
    const { user, posts } = services.user.findById(uid);

    res.render('users/show', { user, posts });
  }

  new(req, res) {

  }

  edit(req, res) {

  }

  create(req, res) {

  }

  update(req, res) {

  }

  destroy(req, res) {
    
  }
}

export default UserController;
