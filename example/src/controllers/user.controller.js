'use strict';

import { Controller } from '../../..';

class UserController extends Controller {
  show(req, res) {
    // access config
    const language = this.config.dev.LANG;
    // access service
    const user = this.services.user.getUser(req.params.id);
    // access custom binds
    console.log(this.redis);

    res.render('user', { message: `Response from service: ${user}` });
  }

  new(req, res) {
    res.json({ message: 'Generating new user' });
  }
}

export default UserController;
