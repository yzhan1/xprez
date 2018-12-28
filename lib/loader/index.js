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

    return !name.match(/^(server|routes)$/);
  }).map((file) => {

    // if loading environment configurations, load the module based
    // on current environment
    if (file === 'environments') {
      const env = process.env.NODE_ENV || 'development';
      const module = require(`${path}/${file}/${env}`).default;

      return { name: 'config', module };
    } else {
      const module = require(`${path}/${file}`).default;

      return { name: file.split('.')[0], module };
    }
  });
  
  return arr;
};
