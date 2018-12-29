import { App as Application } from 'xprez';

const app = new Application(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  // redis: new RedisClient
});

// replace with other view engines or remove it
app.set('view engine', 'ejs');

const server = app.listen(app.config.port);

export default server;
