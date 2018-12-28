import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import logSymbols from 'log-symbols';
import { capitalize, TemplateUtils, log } from '../utils';

const { ejsTemplates, templateMap, structure } = TemplateUtils;

const write = (path, str) => {
  try {
    if (fs.existsSync(path)) {
      log(false, `${logSymbols['error']} ${path} exists already!`);
    } else {
      fs.writeFileSync(path, str);
      log(true, `${logSymbols['success']} Created ${path}`);
    }
  } catch (err) {
    log(false, `${logSymbols['error']} Please run the command in a valid Xprez project folder!`);
    throw err;
  }
}

const createFolder = (structure, currPath, appName) => {
  if (structure.length === 0) {
    // add .gitkeep file for empty folders
    write(path.join(currPath, '.gitkeep'), '');
    return;
  }

  structure.forEach((item) => {
    if (typeof item === 'string') {
      let tpl = templateMap[item];
      if (ejsTemplates.includes(item)) {
        tpl = ejs.render(tpl, { appName });
      }
      write(path.join(currPath, item), tpl);
    } else {
      // create a new folder
      const folderName = Object.keys(item)[0];
      const destination = path.join(currPath, folderName);
      fs.mkdirSync(destination);
      createFolder(item[folderName], destination, appName);
    }
  });
};

const createFile = (name, filePath, component) => {
  if (component === 'controller' || component === 'service') {
    const tpl = ejs.render(templateMap[component], { name: capitalize(name) });
    write(filePath, tpl);
  } else if (component === 'view') {
    // generate view
  } else if (component === 'model') {
    // generate model
  }
};

export default (targetName, cmd) => {
  if (!cmd.controller && !cmd.service && !cmd.view) {
    // generate full project
    const destination = path.join(process.cwd(), targetName);

    fs.mkdirSync(destination);
    createFolder(structure, destination, targetName);
  } else {
    if (cmd.controller) {
      // generate controller
      const destination = path.join(process.cwd(), 'app/controllers', targetName + '.controller.js');
      createFile(targetName, destination, 'controller');
    }
    if (cmd.service) {
      // generate service
      const destination = path.join(process.cwd(), 'app/services', targetName + '.service.js');
      createFile(targetName, destination, 'service');
    }
    if (cmd.view) {
      // generate view
    }
  }
};
