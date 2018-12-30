import { Controller } from '../../..';

class PostController extends Controller {
  index(req, res) {
    const posts = this.services.post.findAll();

    res.render('posts/index', { posts });
  }

  show(req, res) {
    res.json({
      id: req.params.id,
      post: 'This is post content'
    });
  }

  new(req, res) {

  }

  edit(req, res) {

  }

  create(req, res) {
    const { content } = req.body;
    this.services.post.save(content);
    res.redirect('/posts');
  }

  update(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    res.json({ id, content });
  }

  destroy(req, res) {
    res.json({
      id: req.params.id,
      status: 'deleted'
    });
  }
}

export default PostController;
