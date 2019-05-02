import router from '../lib/middlewares/router';
import rm from './test-util';

import express from 'express';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

describe('Router', () => {
  let folderPath, routerPath, app;

  beforeEach(() => {
    app = express();
    app.routes = express.Router();
    app.baseDir = folderPath = path.join(__dirname, 'router-test');
    fs.mkdirSync(folderPath);

    routerPath = path.join(folderPath, 'routes.js');
    fs.writeFileSync(routerPath, `
      export default (app) => {
        const { routes } = app;
        routes.get('/hello', (req, res) => res.send('hello'));
        routes.post('/create', (req, res) => res.send('create'));
      };
    `);
  });

  afterEach(() => rm(folderPath));

  it('should have two routes', () => {
    const routes = router(app);
    assert.equal(routes.stack.length, 2);
  });

  it('should have /hello', () => {
    const routes = router(app);
    const helloRoute = routes.stack.filter((layer) => layer.route.path === '/hello');
    assert.equal(helloRoute.length, 1);
  });

  it('should have /create', () => {
    const routes = router(app);
    const createRoute = routes.stack.filter((layer) => layer.route.path === '/create');
    assert.equal(createRoute.length, 1);
  });
});
