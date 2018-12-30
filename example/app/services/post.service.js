import { Service } from '../../..';

class PostService extends Service {
  constructor(app) {
    super(app);
    this.posts = [
      'Post 1',
      'Post 2'
    ];
  }

  getPostsForUser(uid) {
    console.log(`Fetching posts for user: uid=${uid}`);

    return [
      'This is post 1',
      'This is post 2'
    ];
  }

  findAll() {
    return this.posts;
  }

  save(post) {
    this.posts.push(post);
  }
}

export default PostService;
