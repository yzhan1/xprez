const xprez = require('xprez').Xprez;

const app = new xprez(__dirname, {
  redis: 'Random Redis Client'
});

app.listen(3000);