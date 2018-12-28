import { App as Xprez } from '../..';

const app = new Xprez(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  // redis: new RedisClient
});

app.listen(app.config.port, () => 
  console.log(`App is live on port ${app.config.port}`));
