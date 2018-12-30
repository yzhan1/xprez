export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', (...args) => controllers.hello.index(...args));
  routes.post('/users/create', (...args) => controllers.user.create(...args));
  routes.put('/posts/:id/update', (...args) => controllers.post.update(...args));
  routes.delete('/users/:id', (...args) => controllers.user.destroy(...args));
};