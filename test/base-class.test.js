import BaseClass from '../lib/modules/base-class';

import express from 'express';
import assert from 'assert';

describe('Controller and Service', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.config = { lang: 'english' };
    app.env = 'TEST';
    app.services = { user: 'userService', post: 'postService' };
    app.utils = {
      math: { addOne: x => x + 1 }
    };
    app.userBindings = { testVar: 'test' };
  });

  it('should bind all references', () => {
    const baseClass = new BaseClass(app);
    assert.strictEqual(baseClass.config, app.config.config);
    assert.strictEqual(baseClass.env, app.env);
    assert.strictEqual(baseClass.services, app.services);
    assert.strictEqual(baseClass.utils, app.utils);
    assert.strictEqual(baseClass.testVar, app.userBindings.testVar);
  });

  it('should include all services', () => {
    const baseClass = new BaseClass(app);
    ['user', 'post'].forEach(service =>
      assert.notDeepEqual(baseClass.services[service], undefined));
  });

  it('should be able to access utils', () => {
    const baseClass = new BaseClass(app);
    assert.ok(baseClass.utils.math.addOne instanceof Function);
  });

  it('should not allow using reserved keys', () => {
    app.userBindings = {
      services: { user: 'userService' },
      controllers: { user: 'userController' },
      config: { lang: 'English' }
    };
    assert.throws(() => new BaseClass(app), Error);
  });
});
