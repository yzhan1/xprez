import { App as Application } from '../..';

const app = new Application(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  redis: 'RedisClient'
});

const server = app.listen(app.config.port);

export default server;
