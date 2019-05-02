import { App as Application } from 'xprez';

const app = new Application({
  baseDir: __dirname,

  // declare middlewares. They will be used following the sequence defined here.
  beforeMiddlewares: [

  ],
  afterMiddlewares: [

  ],

  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  binds: {
    // redis: new RedisClient()
  }
});

// replace with other view engines or remove it
app.set('view engine', 'ejs');

export default app;
