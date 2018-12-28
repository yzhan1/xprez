import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

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
          'production.js'
        ]
      },
      'routes.js',
      'server.js'
    ]
  },
  '.gitignore',
  'package.json',
  'README.md'
];

const loadTemplate = (name) =>
  fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');

const write = (path, str) => {
  fs.writeFileSync(path, str);
  console.log(`Creating ${path} ...`);
}

const templateMap = {
  controller: loadTemplate('app/controller.js.ejs'),
  service: loadTemplate('app/service.js.ejs'),

  'production.js': loadTemplate('config/environments/production.js'),
  'development.js': loadTemplate('config/environments/development.js'),
  'routes.js': loadTemplate('config/routes.js'),
  'server.js': loadTemplate('config/server.js'),
  '.gitignore': loadTemplate('gitignore'),
  'package.json': loadTemplate('package.json.ejs'),
  'README.md': loadTemplate('README.md.ejs'),
  'hello.controller.js': loadTemplate('app/hello.controller.js'),
  'index.ejs': loadTemplate('app/views/index.ejs')
};

const ejsTemplates = ['package.json', 'README.md'];

const create = (structure, currPath, appName) => {
  if (structure.length === 0) {
    write(path.join(currPath, '.gitkeep'), '');
    return;
  }

  structure.forEach((item) => {
    if (typeof item === 'string') {
      let template = templateMap[item];
      if (ejsTemplates.includes(item)) {
        template = ejs.render(template, { appName });
      }
      write(path.join(currPath, item), template);
    } else {
      const folderName = Object.keys(item)[0];
      const destination = path.join(currPath, folderName);
      fs.mkdirSync(destination);
      create(item[folderName], destination, appName);
    }
  });
};

export default (targetName, cmd) => {
  console.log(targetName);

  if (!cmd.controller && !cmd.service && !cmd.view) {
    // generate full project
    const destination = path.join(process.cwd(), targetName);

    fs.mkdirSync(destination);
    create(structure, destination, targetName);
  } else {
    if (cmd.controller) {
      // generate controller

    }
    if (cmd.service) {
      // generate service

    }
    if (cmd.view) {
      // generate view

    }
  }
};
