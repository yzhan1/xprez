require = require('esm')(module);

const assert = require('assert');
const app = require('../../config/application').default;
const postServive = app.services.post;

describe('user.service.js', () => {
  it('should be able to find all posts', () => {
    const posts = postServive.findAll();
    assert.notEqual(posts.length, 0);
  });

  it('should be able to find posts by user_id', () => {
    const posts = postServive.getPostsForUser(1);
    assert.notEqual(posts.length, 0);
  });
});