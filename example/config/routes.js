export default (app) => {
  const { controllers } = app;

  return {
    'get /users/:id': (...args) => controllers.user.show(...args),
    'post /users': (...args) => controllers.user.new(...args)
  };
};