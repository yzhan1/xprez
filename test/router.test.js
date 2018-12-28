require = require('esm')(module);

const router = require('../lib/middlewares/router').default;
const express = require('express');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { deleteFolderRecursive } = require('./test-util');

describe('Router', () => {
  let folderPath, routerPath, app;

  beforeEach(() => {
    app = express();
    app.routes = express.Router();
    folderPath = path.join(__dirname, 'router-test');
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

  afterEach(() => deleteFolderRecursive(folderPath));

  it('should have two routes', () => {
    const routes = router(app, folderPath);
    assert.equal(routes.stack.length, 2);
  });

  it('should have /hello', () => {
    const routes = router(app, folderPath);
    const helloRoute = routes.stack.filter((layer) => layer.route.path === '/hello');
    assert.equal(helloRoute.length, 1);
  });

  it('should have /create', () => {
    const routes = router(app, folderPath);
    const createRoute = routes.stack.filter((layer) => layer.route.path === '/create');
    assert.equal(createRoute.length, 1);
  });
});
