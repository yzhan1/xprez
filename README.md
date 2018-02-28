# Xprez

[![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability)

A minimal web framework (built on top of Express.js) that separates router, controllers and services.

To install, run `npm i xprez --save`

```javascript
// src/index.js
const xprez = require('xprez');

const app = new xprez();

app.listen(3000);

// src/routes.js
module.exports = (app) => {
  return {
    'get /users/:id': app.controllers.user.show
  };
};

// src/controllers/user.js
class UserController {
  constructor() {
  }

  show(req, res) {
    // access service
    const user = req.services.userService.getUser(req.params.id);
    res.send(JSON.parse(user));
  }
}

module.exports = UserController;

// src/services/userService.js
class UserService {
  constructor() {
  }

  getUser(id) {
    // fetch from db
  }
}

module.exports = UserService;
```

### Recommended Folder Structure

To start `app`, run `node ./src`

```
.
├── package-lock.json
├── package.json
└── src
    ├── controllers
    │   └── user.js
    ├── index.js      ------> App's entry point
    ├── routes.js    
    └── services
        └── userService.js
```