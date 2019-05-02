require = require('esm')(module);

const request = require('supertest');
const app = require('../../config/application').default;

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

  it('should return 200 for POST /posts/create', (done) => {
    request(app)
      .post('/posts/create')
      .send({ content: 'Test content' })
      .set('Accept', 'application/json')
      .expect(302)
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 200 for PUT /posts/:id/update', (done) => {
    request(app)
      .put('/posts/1/update')
      .send({
        id: 1,
        content: 'Another test content'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 200 for DELETE /posts/:id', (done) => {
    request(app)
      .delete('/posts/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
