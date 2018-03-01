class UserController {
  static show(req, res) {
    // access config
    const dbUrl = req.config.dev.databaseUrl;
    // access service
    const user = req.services.userService.getUser(req.params.id);
    res.send(dbUrl + '' + user);
  }
}

module.exports = UserController;
