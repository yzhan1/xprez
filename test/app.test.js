require = require('esm')(module);

const assert = require('assert');

describe('Application', () => {
  let server, app;
  const binds = ['controllers', 'services', 'routes', 'config'];
  const controllers = ['hello', 'user', 'post'];
  const services = ['user', 'post'];

  beforeEach(() => {
    server = require('./test-app/config/server').default;
    app = server._events.request;
  });

  afterEach(() => server.close());

  it('should have all binds', () => {
    binds.forEach((bind) =>
      assert.notStrictEqual(app[bind], undefined));
  });

  it('should bind all controllers', () => {
    controllers.forEach((controller) => 
      assert.notStrictEqual(app.controllers[controller]), undefined);
  });

  it('should bind all services', () => {
    services.forEach((service) => 
      assert.notStrictEqual(app.services[service]), undefined);
  });

  it('should bind reference only', () => {
    assert.strictEqual(app.services, app.controllers.user.services);
    assert.strictEqual(app.services, app.services.user.services);
  });
});
