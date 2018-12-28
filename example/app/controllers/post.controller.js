import { Controller } from '../../..';

class PostController extends Controller {
  index(req, res) {
    const posts = this.services.post.findAll();

    res.render('posts/index', { posts });
  }

  show(req, res) {
    
  }

  new(req, res) {

  }

  edit(req, res) {

  }

  create(req, res) {

  }

  update(req, res) {

  }

  destroy(req, res) {
    
  }
}

export default PostController;