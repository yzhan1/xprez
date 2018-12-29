import { App as Application } from '../..';

const app = new Application(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  redis: 'RedisClient'
});

app.set('view engine', 'ejs');

if (app.env !== 'test') {
  app.listen(app.config.port);
}

export default app;