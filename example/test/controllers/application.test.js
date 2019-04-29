require = require('esm')(module);

const request = require('supertest');
const app = require('../../config/server').default;

describe('application.controller.js', () => {
  it('should return 200 for /hello', (done) => {
    request(app)
      .get('/hello')
      .expect(200, done);
  });
});
