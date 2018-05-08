const xprez = require('../../..').Xprez;

const app = new xprez(__dirname, {
  redis: 'Random Redis Client'
});

app.listen(3000);