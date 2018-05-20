module.exports = (app) => {
  const { controllers } = app;
  return {
    'get /users/:id': (...args) => controllers.user.show(...args)
  };
};