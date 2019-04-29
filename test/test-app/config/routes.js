export default (app) => {
  const { routes, controllers } = app;

  routes.get('/hello', controllers.application.index);
  routes.post('/users/create', controllers.user.create);
  routes.put('/posts/:id/update', controllers.post.update);
  routes.delete('/users/:id', controllers.user.destroy);
};