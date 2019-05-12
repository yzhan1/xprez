<p align="center">
  <img src="./logo.png">
</p>

[![npm downloads](https://img.shields.io/npm/dt/xprez.svg?style=flat-square)](https://img.shields.io/npm/dt/xprez.svg?style=flat-square) ![npm](https://img.shields.io/npm/v/xprez.svg?style=flat-square) [![Build Status](https://img.shields.io/travis/yzhan1/xprez/master.svg?style=flat-square)](https://travis-ci.org/yzhan1/xprez) [![Maintainability](https://img.shields.io/codeclimate/maintainability/yzhan1/xprez.svg?style=flat-square)](https://codeclimate.com/github/yzhan1/xprez/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/yzhan1/xprez/badge.svg?style=flat-square)](https://snyk.io/test/github/yzhan1/xprez) ![License](https://img.shields.io/npm/l/xprez.svg?style=flat-square) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/yzhan1/xprez/issues) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# [Xprez.js](https://yzhan1.github.io/xprez)

__Notification: This is still a Work in Progress__

A minimal opinionated ES6 web framework with CLI (built on top of [Express.js](https://github.com/expressjs/express/)) that separates router, controllers and services.

Heavily inspired by [Egg.js](https://github.com/eggjs/egg) and [Ruby on Rails](https://github.com/rails/rails).

[View Documentation](https://yzhan1.github.io/xprez)

[GitHub Repo](https://github.com/yzhan1/xprez)

## Features

+ ✔︎ Model-View-Controller pattern for your web project
+ ✔︎ Load routes/controllers/services/middlewares automatically for you
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
        ├── application.controller.js
        └── // place controllers here
    ├── services/
        └── // place services here
    ├── views/
        └── index.ejs
    ├── middlewares/
        └── // place middlewares here
    ├── models/
    ├── utils/
        └── // place utilities here
    └── public/
├── config/
    ├── environments/
        ├── development.js // development config vars
        ├── test.js        // test config vars
        └── production.js  // prod config vars
    ├── server.js          // App's entry point
    ├── application.js     // App definition
    └── routes.js
└── test/
    ├── controllers/       // controller tests
    ├── services/          // service tests
    └── utils/             // utility tests
```

Notice that you need to strictly follow
this structure in order to make your app executable.

### To run the app server

```bash
# in ./myapp
$ xprez s
```

### Generate new controller/service/util

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

```bash
# math is the utility class name, -u is for --utility
$ xprez g math -u
```

This generates `myapp/app/utils/math.util.js`.

All generate commands need to be executed in the root of the project folder, otherwise it will throw file not found error.

## Documentation

The main components are inside `app/` and `config/` folders. App folder contains key components including controllers, services, views and models. Config folder includes files with config variables, routes declaration and server entry file.

### config/application.js

This file includes the application initialization code.

```javascript
import { App as Application } from 'xprez';

const app = new Application({
  baseDir: __dirname,

  // middlewares before request
  beforeMiddlewares: [],
  // middlewares after request
  afterMiddlewares: [],
  // bind references in this hash
  binds: {
    redis: new RedisClient(),
    db: new SQLClient()
  }
});
// you can choose to configure a view engine, or just send json as response
app.set('view engine', 'ejs');

// expose app for testing
export default app;
```

You can pass in a hash to the constructor to bind config/database connections or other stuffs to the app object. They can be used in controller and service classes later.

### config/server.js

Define server startup logic here.

```javascript
import app from './application';
// you can use cluster library to start the app here
app.listen(app.config.port);
export default app;
```

### config/routes.js

This file is mainly used to describe the corresponding relationship between the request URL and the controller that processes the request.

A basic router looks like:

```javascript
// config/routes.js
export default app => {
  const { routes, controllers } = app;
  routes.get('/users/:id', controllers.user.show);
};
```

Then we need a basic implementation of `UserController`.

```javascript
// app/controllers/user.controller.js
import ApplicationController from './application.controller';

export default class UserController extends ApplicationController {
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

Controllers are responsible for handling each request and sending response to the client. You can generate a controller class using
`xprez g <controllerName> -c`.

A basic controller implementation looks like this:

```javascript
// app/controllers/user.controller.js
import ApplicationController from './application.controller';

// extend from ApplicationController to get binds defined for controller layer only
export default class UserController extends ApplicationController {
  async show(req, res) {
    const uid = req.params.id;
    const user = await this.services.user.findById(uid);
    const two = this.utils.math.addOne(1);
    this.redis.set(uid, user);
    const { language } = this.config;
    res.render('users/show', { user, language });
  }
}
```

Notice that the controller object has access to our services, utils, configuration and the custom binds we declared in `config/application.js`.

### app/services

Service is a layer used to encapsulate business logic in complex business circumstances. You can generate a service class using 
`xprez g <serviceName> -s`.

A basic service implementation:

```javascript
// app/services/user.service.js
import { Service } from 'xprez';

export default class UserService extends Service {
  async findById(uid) {
    const two = this.utils.math.addOne(1);
    const user = await this.db.findById(uid);
    user.language = this.config.language;
    const posts = this.services.post.get(uid);
    return { user, posts };
  }
}
```

Service classes also have access to config/utils/binds/other services. It's recommended to put all business logic inside service classes so they can be accessed by other controllers/services.

### app/middlewares

Middlewares are some functions you would like to execute before or after each request. You can add middlewares inside `app/middlewares`.

Below is a basic implementation of middleware:

```javascript
// app/middlewares/greet.js
export default (req, res, next) => {
  console.log('Hello!');
  next();
};
```

Then, in `config/application.js`, add this to either `beforeMiddlewares` or `afterMiddlewares` depending on whether you want it to
run before or after request.

```javascript
const app = new Application({
  // ...
  beforeMiddlewares: [
    // use only the file name before ".js"
    'greet'
  ],
  afterMiddlewares: [
    'greet'
  ],
  // ...
});
```

Or you can access your middlewares in `config/routes.js` by using `app.middlewares.greet`.

If you have multiple middlewares `greet`, `prompt` and `farwell`, you can list them in the array in the based on the
desired execution sequence. For example:

```javascript
beforeMiddlewares: [
  'greet', 'prompt', 'farwell'
]
```

Example can be found in `./example/config/application.js`.

### app/utils

Utililities are mainly stateless helper functions that you want to use throughout your project. You can generate a utility class by doing `xprez g <utilityName> -u`.

Utility files usually look like this:

```javascript
// app/utils/math.util.js
export default {
  addOne(x) {
    return x + 1;
  }
};
```

Then, in your `Controller` or `Service`, you can access them by using `this.utils.math.addOne(x)`.

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
const app = require('path/to/config/application.js').default;

describe('Test user.controller.js', () => {
  it('should return 200', done => {
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

+ Database/Model support for MySQL/PostgreSQL/MongoDB

## License

Xprez.js is released under the [MIT License](LICENSE.md).