import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import logSymbols from 'log-symbols';
import { capitalize, TemplateUtils, log } from '../utils';

const {
  ejsTemplates, templateMap, structure, filePathMapping
} = TemplateUtils;

/**
 * Write content to a file. Throws error if file exists already
 * or path is invalid.
 * 
 * @param {string} path File path
 * @param {string} str File content
 */
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

/**
 * Create a new folder and generate files based on required folder
 * structure. 
 * 
 * @param {Array} structure Structure for current folder
 * @param {string} currPath Current folder path
 * @param {string} appName Name of the app/project
 */
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
      const dest = path.join(currPath, folderName);
      fs.mkdirSync(dest);
      createFolder(item[folderName], dest, appName);
    }
  });
};

/**
 * Generate template for a component and write it to file
 * 
 * @param {string} name Name for Controller/Service/Util
 * @param {string} component Controller/Service/Util
 */
const createFile = (name, component) => {
  const { folder, suffix } = filePathMapping[component];
  const dest = path.join(process.cwd(), folder, `${name}${suffix}`);

  let tpl = templateMap[component];
  if (ejsTemplates.includes(component)) {
    tpl = ejs.render(tpl, { name: capitalize(name) });
  }
  write(dest, tpl);
};

/**
 * All options available for `xprez g`
 */
const allOptions = ['controller', 'service', 'utility'];

/**
 * Generate a new project or component template based on the command
 */
export default (targetName, cmd) => {
  if (!cmd.controller && !cmd.service && !cmd.utility) {
    // generate full project
    const destination = path.join(process.cwd(), targetName);

    fs.mkdirSync(destination);
    createFolder(structure, destination, targetName);
  } else {
    // generate individual templates
    allOptions.forEach((option) => {
      if (cmd[option]) {
        createFile(targetName, option);
      }
    });
  }
};
