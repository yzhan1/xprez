module.exports = (app) => {
  return {
    'get /users/:id': app.controllers.user.show
  };
};