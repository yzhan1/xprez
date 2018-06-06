import { Service } from '../../..';

class PostService extends Service {
  getPost(id) {
    return `Post ${id}`;
  }
}

export default PostService;
