const Service = require('xprez').modules.Service;

class UserService extends Service {
  constructor(props) {
    super(props);
  }

  getUser(id) {
    return `${this.config.dev.LANG} user ${id}`;
  }
}

module.exports = UserService;