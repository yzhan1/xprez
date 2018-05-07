const Service = require('xprez').Service;

class UserService extends Service {
  getUser(id) {
    console.log(this.redis);

    return `${this.config.dev.LANG} user ${id}`;
  }
}

module.exports = UserService;