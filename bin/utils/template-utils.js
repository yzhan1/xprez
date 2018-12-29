import fs from 'fs';
import path from 'path';

const structure = [
  {
    app: [
      { controllers: ['hello.controller.js'] },
      { models: [] },
      { public: [] },
      { services: [] },
      { views: ['index.ejs'] },
    ]
  },
  {
    config: [
      {
        environments: [
          'development.js',
          'production.js',
          'test.js'
        ]
      },
      'routes.js',
      'server.js'
    ]
  },
  {
    test: [
      { controllers: [] },
      { services: [] }
    ]
  },
  '.gitignore',
  'package.json',
  'README.md'
];

const loadTemplate = (name) =>
  fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');

const templateMap = {
  controller: loadTemplate('app/controller.js.ejs'),
  service: loadTemplate('app/service.js.ejs'),

  'production.js': loadTemplate('config/environments/production.js'),
  'development.js': loadTemplate('config/environments/development.js'),
  'test.js': loadTemplate('config/environments/test.js'),
  'routes.js': loadTemplate('config/routes.js'),
  'server.js': loadTemplate('config/server.js'),
  '.gitignore': loadTemplate('gitignore'),
  'package.json': loadTemplate('package.json.ejs'),
  'README.md': loadTemplate('README.md.ejs'),
  'hello.controller.js': loadTemplate('app/hello.controller.js'),
  'index.ejs': loadTemplate('app/views/index.ejs')
};

const ejsTemplates = ['package.json', 'README.md'];

export default {
  ejsTemplates, templateMap, structure
};