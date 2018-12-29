require = require('esm')(module);

const request = require('supertest');
const app = require('../../config/server').default;

describe('post.controller.js', () => {
  it('should return 200 for /posts/:id', (done) => {
    request(app)
      .get('/posts/1')
      .expect(200, done);
  });

  it('should return 200 for /posts', (done) => {
    request(app)
      .get('/posts')
      .expect(200, done);
  });
});
