require = require('esm')(module);

const request = require('supertest');
const app = require('../../config/application').default;

describe('user.controller.js', () => {
  it('should return 200 for /users/:id', (done) => {
    request(app)
      .get('/users/1')
      .expect(200, done);
  });
});
