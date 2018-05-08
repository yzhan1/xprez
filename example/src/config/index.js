const xprez = require('../../..').Application;

const app = new xprez(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  redis: 'Random Redis Client'
});

app.listen(3000);