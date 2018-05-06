const Service = require('xprez').Service;

class UserService extends Service {
  getUser(id) {
    return `${this.config.dev.LANG} user ${id}`;
  }
}

module.exports = UserService;