import { Service } from '../../..';

class UserService extends Service {
  findById(uid) {
    // access binds
    const { services, redis, config } = this;
    console.log(this.config);
    const posts = services.post.getPostsForUser(uid);

    console.log(`Redis URL: ${redis}`);
    console.log(`DB URL: ${config.db}`);

    return { user: 'user1', posts };
  }
}

export default UserService;
