export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', controllers.application.index);
};
