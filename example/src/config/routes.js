module.exports = (app) => {
  return {
    'get /users/:id': (...args) => app.controllers.user.show(...args)
  };
};