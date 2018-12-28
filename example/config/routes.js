export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', (...args) => controllers.hello.index(...args));
  routes.get('/users/:id', (...args) => controllers.user.show(...args));
  routes.get('/posts', (...args) => controllers.post.index(...args));
};