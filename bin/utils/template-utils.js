import fs from 'fs';
import path from 'path';

/**
 * Project folder structure
 */
const structure = [
  {
    app: [
      { controllers: ['hello.controller.js'] },
      { models: [] },
      { public: [] },
      { services: [] },
      { views: ['index.ejs'] },
      { utils: [] },
      { middlewares: [] }
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
      { services: [] },
      { utils: [] }
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
  utility: loadTemplate('app/util.js'),

  'production.js': loadTemplate('config/environments/production.js'),
  'development.js': loadTemplate('config/environments/development.js'),
  'test.js': loadTemplate('config/environments/test.js'),
  'routes.js': loadTemplate('config/routes.js'),
  'server.js': loadTemplate('config/server.js'),
  '.gitignore': loadTemplate('gitignore'),
  'package.json': loadTemplate('package.json.ejs'),
  'README.md': loadTemplate('README.md.ejs'),
  'application.controller.js': loadTemplate('app/application.controller.js'),
  'index.ejs': loadTemplate('app/views/index.ejs')
};

const filePathMapping = {
  controller: {
    folder: 'app/controllers',
    suffix: '.controller.js'
  },
  service: {
    folder: 'app/services',
    suffix: '.service.js'
  },
  utility: {
    folder: 'app/utils',
    suffix: '.util.js'
  }
};

/**
 * Templates that need to render from EJS
 */
const ejsTemplates = ['package.json', 'README.md', 'controller', 'service'];

export default {
  ejsTemplates, templateMap, structure, filePathMapping
};