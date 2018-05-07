const Controller = require('xprez').Controller;

class UserController extends Controller {
  show(req, res) {
    // access config
    const language = this.config.dev.LANG;
    // access service
    const user = this.services.user.getUser(req.params.id);

    console.log(this.redis);

    res.render('user', {
      message: `Language: ${language} . User ID: ${user}`
    });
  }
}

module.exports = UserController;
