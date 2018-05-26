'use strict';

import { App as xprez } from '../..';

const app = new xprez(__dirname, {
  // bind references in this hash
  // `config`, `controllers` and `services` are reserved keywords
  redis: 'Random Redis Client'
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
