require = require('esm')(module);

const assert = require('assert');
const app = require('../../config/server').default;
const userService = app.services.user;

describe('user.service.js', () => {
  it('should have a logger', () => {
    assert.strictEqual(userService.logger, 'Test logger');
  });

  it('should have access to math.util.js', () => {
    assert.notStrictEqual(userService.utils.math, undefined);
  });

  it('should be able to find user by id', () => {
    const { user, posts } = userService.findById(1);
    assert.strictEqual(user, 'user1');
  });
});