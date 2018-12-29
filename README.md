<p align="center">
  <img src="./logo.png">
</p>

![npm downloads](https://img.shields.io/npm/dt/xprez.svg) ![npm](https://img.shields.io/npm/v/xprez.svg) [![Build Status](https://travis-ci.org/yzhan1/xprez.svg?branch=master&style=flat-square)](https://travis-ci.org/yzhan1/xprez) [![Known Vulnerabilities](https://snyk.io/test/github/yzhan1/xprez/badge.svg)](https://snyk.io/test/github/yzhan1/xprez) [![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/yzhan1/xprez/issues)

# [Xprez.js](https://yzhan1.github.io/xprez)

** Notification: This is still a Work in Progress **

A minimal opinionated ES6 web framework with CLI (built on top of [Express.js](https://github.com/expressjs/express/)) that separates router, controllers and services.

Heavily inspired by [Egg.js](https://github.com/eggjs/egg) and [Ruby on Rails](https://github.com/rails/rails).

[View Documentation](https://yzhan1.github.io/xprez)

[GitHub Repo](https://github.com/yzhan1/xprez)

## Features

+ ✔︎ Model-View-Controller pattern for your web project
+ ✔︎ Load routes/controllers/service automatically for you
+ ✔︎ Access services classes easily
+ ✔︎ Ruby-on-Rails style directory structure
+ ✔︎ CLI program that generates new project templates

## Quick Start

To install:

```bash
# install globally to use the cli
$ npm i -g xprez
$ npm i -S xprez
```

Sample directory is located in `./example`. To run the example:

```bash
$ git clone https://github.com/yzhan1/xprez.git
$ cd xprez/ && npm i
$ cd example/
$ xprez s
$ open http://localhost:3000/users/1
```

To contribute:

```bash
$ git clone https://github.com/yzhan1/xprez.git
$ cd xprez/ && npm i
```

Running test suite:

```bash
$ npm test
```

## Executable Commands

All commands need to be run in the project directory.

### View all options

```bash
$ xprez -h
```

### Generate new project

```bash
# myapp is the project name
$ xprez g myapp
```

This will create `./myapp` with the following structure:

```text
myapp/
├── package-lock.json
├── package.json
├── app/
    ├── controllers/
        ├── hello.controller.js
        └── // place controllers here
    ├── services/
        └── // place services here
    ├── views/
        └── index.ejs
    ├── models/
    └── public/
├── config/
    ├── environments/
        ├── development.js // development config vars
        ├── test.js        // test config vars
        └── production.js  // prod config vars
    ├── server.js          // App's entry point
    └── routes.js
└── test/
    ├── controllers/       // controller tests
    └── services/          // service tests
```

Notice that you need to strictly follow
this structure in order to make your app executable.

### To run the app server

```bash
# in ./myapp
$ xprez s
```

### Generate new controller/service

First `cd myapp` and run the following command

```bash
# user is the controller name, -c is for --controller
$ xprez g user -c
```

This generates `myapp/app/controllers/user.controller.js`.

```bash
# post is the service name, -s is for --service
$ xprez g post -s
```

This generates `myapp/app/services/post.service.js`.

All generate commands need to be executed in the root of the project folder, otherwise it will throw file not found error.

## Documentation

The main components are inside `app/` and `config/` folders. App folder contains key components including controllers, services, views and models. Config folder includes files with config variables, routes declaration and server entry file.

### config/server.js

This file includes the server initialization code.

```javascript
import { App as Application } from 'xprez';

const app = new Application(__dirname, {
  // bind references in this hash
  redis: new RedisClient(),
  db: new SQLClient()
});
// you can choose to configure a view engine, or just send json as response
app.set('view engine', 'ejs');

// don't run the server when testing
if (app.env !== 'test') {
  app.listen(app.config.port);
}
// expose app for testing
export default app;
```

You can pass in a hash to the constructor to bind config/database connections or other stuffs to the app object. They can be used in controller and service classes later.

### config/routes.js

This file is mainly used to describe the corresponding relationship between the request URL and the controller that processes the request.

A basic router looks like:

```javascript
// config/routes.js
export default (app) => {
  const { routes, controllers } = app;
  routes.get('/users/:id', (...args) => controllers.user.show(...args));
};
```

Then we need a basic implementation of `UserController`.

```javascript
// app/controllers/user.controller.js
import { Controller } from 'xprez';

export default class UserController extends Controller {
  show(req, res) {
    res.send('Hello');
  }
}
```

`routes` is actually an Express router instance, so you can also use it like how you normally would in a pure Express app.

### config/environments

Environments folder contain environment variables that you could like to configure for your app. These variables will be available in the controller and service classes.

Xprez.js will only load the config file based on the environment. So in dev environment, it only loads `development.js`.

### app/controllers

Controllers are responsible for handling each request and sending response to the client.

A basic controller implementation looks like this:

```javascript
// app/controllers/user.controller.js
import { Controller } from 'xprez';

export default class UserController extends Controller {
  async show(req, res) {
    const uid = req.params.id;
    const user = await this.services.user.findById(uid);
    this.redis.set(uid, user);
    const { language } = this.config;
    res.render('users/show', { user, language });
  }
}
```

Notice that the controller object has access to our services, configuration and the custom binds we declared in `config/server.js`.

### app/services

Service is a layer used to encapsulate business logic in complex business circumstances.

A basic service implementation:

```javascript
// app/services/user.service.js
import { Service } from 'xprez';

export default class UserService extends Service {
  async findById(uid) {
    const user = await this.db.findById(uid);
    user.language = this.config.language;
    this.services.post.save(user.posts);
    return user;
  }
}
```

Service classes also have access to config/binds/other services. It's recommended to put all business logic inside service classes so they can be accessed by other controllers/services.

## Extensions

Since the `Application` class is an Express app under the hood, you can still treat it like a normal Express.js app, which means you can add in models, middlewares, authentications and other plugins/libraries as you normally would.

To extend a `Controller` or `Service`, all you need to do is add the constructor declaration by doing:

```javascript
/* same pattern can be used for Controller class as well */
export default class UserService extends Service {
  constructor(app) {
    super(app); // must call super(app) to bind other references
    this.logger = require('log4js').getLogger();
  }
}
```

## Testing

You can test the application like how you test an Express app. A starting test script would look like:

```javascript
// test/controllers/user.test.js
require = require('esm')(module);

const request = require('supertest');
const app = require('path/to/config/server.js').default;

describe('Test user.controller.js', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/users/1')
      .expect(200, done);
  });
});
```

Then you can access the `app` instance and test it using request libraries.

Remember to set `NODE_ENV` to `test` when testing so that the server won't actually start! It's recommended to add your test scripts
to `package.json` as an npm script. It's also recommended to use [supertest](https://github.com/visionmedia/supertest) for testing, but theoretically you can use any libraries you like.

## Future Improvements

+ Model support for MySQL/PostgreSQL/MongoDB
+ Middleware support
+ Better test support

## License

Xprez.js is released under the [MIT License](LICENSE.md).