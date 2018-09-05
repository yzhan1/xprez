import { Service } from '../../..';

class UserService extends Service {
  getUser(id) {
    // access custom binds
    const { redis, services, config } = this;
    // access other services
    console.log(services.post.getPost(id));

    return `User ${id} speaks ${config.LANG}.`;
  }
}

export default UserService;
