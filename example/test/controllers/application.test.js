require = require('esm')(module);

const request = require('supertest');
const app = require('../../config/application').default;

describe('application.controller.js', () => {
  it('should return 200 for /hello', (done) => {
    request(app)
      .get('/hello')
      .expect(200, done);
  });
});
