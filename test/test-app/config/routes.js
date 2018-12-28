export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', (...args) => controllers.hello.index(...args));
};