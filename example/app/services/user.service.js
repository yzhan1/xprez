import { Service } from '../../..';

class UserService extends Service {
  constructor(app) {
    super(app);
    this.logger = 'Test logger';
  }

  findById(uid) {
    // access binds
    const { services, redis, config, utils } = this;
    console.log(this.config);
    console.log(utils.math.addOne(1));
    const posts = services.post.getPostsForUser(uid);

    console.log(`Redis URL: ${redis}`);
    console.log(`DB URL: ${config.db}`);

    return { user: `user${uid}`, posts };
  }
}

export default UserService;
