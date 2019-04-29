require = require('esm')(module);

const assert = require('assert');
const request = require('supertest');

describe('Application', () => {
  let app;
  const binds = ['controllers', 'services', 'routes', 'config', 'utils'];
  const controllers = ['application', 'user', 'post'];
  const services = ['user', 'post'];
  const utils = ['math'];

  beforeEach(() => {
    app = require('./test-app/config/server').default;
  });

  it('should have all binds', () => {
    binds.forEach((bind) => assert.notStrictEqual(app[bind], undefined));
  });

  it('should bind all controllers', () => {
    controllers.forEach((controller) => 
      assert.notStrictEqual(app.controllers[controller]), undefined);
  });

  it('should bind references inherited from ApplicationController', () => {
    assert.strictEqual(app.controllers['application']['rpcClient'], app.controllers['user']['rpcClient']);
  });

  it('should bind all services', () => {
    services.forEach((service) => 
      assert.notStrictEqual(app.services[service]), undefined);
  });

  it('should bind all utils', () => {
    utils.forEach((util) => assert.notStrictEqual(app.utils[util], undefined));
  });

  it('should load test config', () => {
    const config = require('./test-app/config/environments/test').default;
    assert.strictEqual(app.config, config);
  });

  it('should bind reference only', () => {
    assert.strictEqual(app.services, app.controllers.user.services);
    assert.strictEqual(app.services, app.services.user.services);
  });

  it('should respond to GET', (done) => {
    request(app).get('/hello').expect(200, done);
  });

  it('should respond to POST', (done) => {
    request(app)
      .post('/users/create')
      .expect(200)
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it('should respond to PUT', (done) => {
    request(app)
      .put('/posts/1/update')
      .expect(200)
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it('should respond to DELETE', (done) => {
    request(app)
      .delete('/users/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
