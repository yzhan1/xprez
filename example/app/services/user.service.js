'use strict';

import { Service } from '../../..';

class UserService extends Service {
  getUser(id) {
    // access custom binds
    const myRedis = this.redis;
    // access other services
    console.log(this.services.post.getPost(id));

    return `User ${id} speaks ${this.config.LANG}.`;
  }
}

export default UserService;
