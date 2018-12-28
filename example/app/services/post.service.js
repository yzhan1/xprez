import { Service } from '../../..';

class PostService extends Service {
  getPostsForUser(uid) {
    console.log(`Fetching posts for user: uid=${uid}`);

    return [
      'This is post 1',
      'This is post 2'
    ];
  }

  findAll() {
    return [
      'Post 1',
      'Post 2'
    ];
  }
}

export default PostService;
