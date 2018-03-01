const fs = require('fs');
const path = require('path');

const loader = (path) => {
  const dir = fs.readdirSync(path);
 
  const arr = 
    dir
      .filter((file) => {
        const name = file.split('.')[0];

        return name !== 'index' && name !== 'routes';
      })
      .map((file) => {
        const module = require(`${path}/${file}`);
        return { name: file.split('.')[0], module };
      });
  return arr;
};

const controllerFolder = path.join(__dirname, '/../../../../src/controllers');
const loadControllers = () => loader(controllerFolder);

const serviceFolder = path.join(__dirname, '/../../../../src/services');
const loadServices = () => loader(serviceFolder);

const configFolder = path.join(__dirname, '/../../../../src/config');
const loadConfig = () => loader(configFolder);

module.exports = {
  loadControllers,
  loadServices,
  loadConfig
};
