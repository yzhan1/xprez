const Xprez = require('../../..');

const app = new Xprez.App(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  redis: 'Random Redis Client'
});

app.listen(3000);