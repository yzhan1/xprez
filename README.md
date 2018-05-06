# Xprez

[![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability) [![npm version](https://badge.fury.io/js/xprez.svg)](https://badge.fury.io/js/xprez) ![npm downloads](https://img.shields.io/npm/dt/xprez.svg)

A minimal web framework (built on top of Express.js) that separates router, controllers and services. Inspired by Egg.js.

To install, run `npm i xprez --save`

### Example code
```javascript
// src/config/index.js
const xprez = require('xprez').Xprez;

const app = new xprez(__dirname);

app.listen(3000);

// src/config/routes.js
module.exports = (app) => {
  return {
    'get /users/:id': (...args) => app.controllers.user.show(...args),
    'post /users': (...args) => app.controllers.user.new(...args),
  };
};

// src/config/dev.js
module.exports = {
  REDIS_URL: 'redis://localhost:6379',
  LANG: 'English'
};

// src/controllers/user.controller.js
const Controller = require('xprez').Controller;

class UserController extends Controller {
  show(req, res) {
    // access config
    const redis = this.config.dev.REDIS_URL;
    // access service
    const user = this.services.user.getUser(req.params.id);
    
    res.render('user', {message: `Redis URL: ${redis} . User ID: ${user}`});
  }
}

module.exports = UserController;

// src/services/user.service.js
const Service = require('xprez').Service;

class UserService extends Service {
  getUser(id) {
    return `${this.config.dev.LANG} user ${id}`;
  }
}

module.exports = UserService;
```

### Required Folder Structure

To start app, run `node src/config`

```
.
├── package-lock.json
├── package.json
└── src
    ├── controllers
    │   └── user.controller.js
    └── config
        ├── dev.js
        ├── prod.js
        ├── index.js      ------> App's entry point
        ├── routes.js  
    └── services
        └── user.service.js
    └── views
        └── user.ejs
```