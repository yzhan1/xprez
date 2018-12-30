export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', (...args) => controllers.hello.index(...args));
  routes.get('/users/:id', (...args) => controllers.user.show(...args));
  routes.get('/posts', (...args) => controllers.post.index(...args));
  routes.get('/posts/:id', (...args) => controllers.post.show(...args));

  routes.post('/posts/create', (...args) => controllers.post.create(...args));
  routes.put('/posts/:id/update', (...args) => controllers.post.update(...args));
  routes.delete('/posts/:id', (...args) => controllers.post.destroy(...args));
};