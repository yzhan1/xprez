import { App as Xprez } from '../../..';

const app = new Xprez(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  // redis: new RedisClient
});

const server = app.listen(app.config.port);

export default server;
