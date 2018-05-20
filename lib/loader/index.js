'use strict';

import fs from 'fs';

/**
 * This method loads from a folder and returns an 
 * array of all the modules inside this folder.
 * 
 * @param {string} path A folder to be loaded from
 */
export default (path) => {
  const dir = fs.readdirSync(path);
 
  const arr = dir.filter((file) => {
    const name = file.split('.')[0];

    return !name.match(/^(index|routes)$/);
  }).map((file) => {
    const module = require(`${path}/${file}`);

    return { name: file.split('.')[0], module };
  });

  return arr;
};
