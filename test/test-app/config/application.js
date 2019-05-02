import { App as Application } from '../../..';

const app = new Application({
  baseDir: __dirname,

  beforeMiddlewares: [
    
  ],
  afterMiddlewares: [

  ],

  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  binds: {
    redis: 'RedisClient'
  }
});

app.set('view engine', 'ejs');

export default app;