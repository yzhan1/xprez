class UserService {
  constructor() {
    this.count = 1;
  }

  getUser(id) {
    return `user ${id}, ${this.count++}`;
  }
}

module.exports = UserService;