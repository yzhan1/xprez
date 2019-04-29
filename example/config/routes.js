export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', controllers.application.index);
  routes.get('/users/:id', controllers.user.show);
  routes.get('/posts', controllers.post.index);
  routes.get('/posts/:id', controllers.post.show);

  routes.post('/posts/create', controllers.post.create);
  routes.put('/posts/:id/update', controllers.post.update);
  routes.delete('/posts/:id', controllers.post.destroy);
};