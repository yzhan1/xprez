# Xprez.js

![npm downloads](https://img.shields.io/npm/dt/xprez.svg?style=flat-square) ![npm](https://img.shields.io/npm/v/xprez.svg?style=flat-square)  [![Known Vulnerabilities](https://snyk.io/test/github/yzhan1/xprez/badge.svg?style=flat-square)](https://snyk.io/test/github/yzhan1/xprez) [![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability)

** Notification: This is still a Work in Progress **

A minimal opinionated ES6 web framework with CLI (built on top of [Express.js](https://github.com/expressjs/express/)) that separates router, controllers and services.

Heavily inspired by [Egg.js](https://github.com/eggjs/egg) and [Ruby on Rails](https://github.com/rails/rails).

## Features

+ ✔︎ Model-View-Controller pattern for your web project
+ ✔︎ Ruby-on-Rails style directory structure
+ ✔︎ CLI program that generates new project templates

## Getting Started

To install:

```bash
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

### Executable Commands

All commands need to be run in the project directory.

#### View all options

```bash
$ xprez -h
```

#### Generate new project

```bash
# myapp is the project name
$ xprez g myapp
```

This will create `./myapp` with the following structure:

```text
myapp/
├── package-lock.json
├── package.json
├── app
    ├── controllers
        ├── hello.controller.js
        └── // place controllers here
    ├── services
        └── // place services here
    ├── views
        └── index.ejs
    ├── models
    └── public
└── config
    ├── environments
        ├── development.js // development config vars
        ├── test.js        // test config vars
        └── production.js  // prod config vars
    ├── server.js      ------> App's entry point
    └── routes.js 
```

Notice that you need to strictly follow
this structure in order to make your app executable.

#### To run the app server

```bash
# in ./myapp
$ xprez s
```

#### Generate new controller/service

First `cd myapp` and run the following command

```bash
# user is the controller name, -c is for --controller
$ xprez g user -c
```

This generates `myapp/app/controllers/user.controller.js`.

```bash
# post is the service name, -s is for --service
$ xprez g post -c
```

This generates `myapp/app/services/post.service.js`.

All generate commands need to be executed in the root of the project folder, otherwise it will throw file not found error.

## Documentation

The main components are inside `app/` and `config/` folders. App folder contains key components including controllers, services, views and models. Config folder includes files with config variables, routes declaration and server entry file.

### config/server.js

This file includes the server initialization code.

```javascript
import { App as Xprez } from 'xprez';

const app = new Xprez(__dirname, {
  // bind references in this hash
  redis: new RedisClient(),
  db: new SQLConnector()
});

app.listen(app.config.port);
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
    const userId = req.params.id;
    const user = await this.services.user.findById(userId);
    this.redis.set(userId, user);
    const language = { this.config };
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
  async findById(id) {
    const user = await this.db.findById(id);
    user.language = this.config.language;
    this.services.post.save(user.posts);
    return user;
  }
}
```

Service classes also have access to config/binds/other services. It's recommended to put all business logic inside service classes so they can be accessed by other controllers/services.

## Future Improvements

+ Model support for MySQL/PostgreSQL/MongoDB
+ Test support
+ Middleware support
+ View templates using hbs and other templating languages

## License

[MIT](LICENSE.md)