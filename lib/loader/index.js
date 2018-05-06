const fs = require('fs');
const path = require('path');

/**
 * This method loads from a folder and returns an 
 * array of all the modules inside this folder.
 * 
 * @param {string} path A folder to be loaded from.
 */
const load = (path) => {
  const dir = fs.readdirSync(path);
 
  const arr = dir.filter((file) => {
      const name = file.split('.')[0];

      return name !== 'index' && name !== 'routes';
    }).map((file) => {
      const module = require(`${path}/${file}`);

      return { name: file.split('.')[0], module };
    });
  return arr;
};

module.exports = (path) => load(path);
