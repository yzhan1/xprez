const Controller = require('xprez').Controller;

class UserController extends Controller {
  show(req, res) {
    // access config
    const redis = this.config.dev.REDIS_URL;
    // access service
    const user = this.services.user.getUser(req.params.id);
    
    res.render('user', {
      message: `Redis URL: ${redis} . User ID: ${user}`
    });
  }
}

module.exports = UserController;
