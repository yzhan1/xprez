export default (app) => {
  const { routes, controllers } = app;

  routes.get('/users/:id', (...args) => controllers.user.show(...args));
  routes.post('/users', (...args) => controllers.user.create(...args));
};