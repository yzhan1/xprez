# Xprez

[![npm version](https://badge.fury.io/js/xprez.svg)](https://badge.fury.io/js/xprez) [![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability) ![npm downloads](https://img.shields.io/npm/dt/xprez.svg)

A minimal web framework (built on top of Express.js) that separates router, controllers and services.

[GitHub](https://github.com/yzhan1/xprez)

** Forking and PR's are welcome **

To install, run `npm i xprez --save`

```javascript
// src/config/index.js
const xprez = require('xprez');

const app = new xprez();

app.listen(3000);

// src/config/routes.js
module.exports = (app) => {
  return {
    'get /users/:id': app.controllers.user.show,
    'post /users/new': app.controllers.user.new
  };
};

// src/config/dev.js
module.exports = {
  'databaseUrl': 'localhost:12345'
}

// src/controllers/user.js
class UserController {
  static show(req, res) {
    // access config
    const dbUrl = req.config.dev.databaseUrl;
    // access service
    const user = req.services.userService.getUser(req.params.id);
    res.send(dbUrl + '' + user);
  }
}

module.exports = UserController;

// src/services/userService.js
class UserService {
  constructor() {
    this.count = 1;
  }

  getUser(id) {
    return `user ${id}, ${this.count++}`;
  }
}


module.exports = UserService;
```

### Required Folder Structure

To start `app`, run `node ./src/config`

```
.
├── package-lock.json
├── package.json
└── src
    ├── controllers
    │   └── user.js
    └── config
        ├── dev.js
        ├── prod.js
        ├── index.js      ------> App's entry point
        ├── routes.js  
    └── services
        └── userService.js
```

### Todos

- [ ] Unit tests