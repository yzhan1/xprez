const fs = require('fs');
const path = require('path');

const loader = (path) => {
  const dir = fs.readdirSync(path);

  return dir.map((file) => {
    const name = file.split('.')[0];
    if (name === 'index' || name === 'routes') {
      continue;
    }

    const module = require(`${path}/${file}`);

    return { name, module };
  });
};

const controllerFolder = path.join(__dirname, '/../../../../src/controllers');
const loadControllers = () => loader(controllerFolder);

const serviceFolder = path.join(__dirname, '/../../../../src/services');
const loadServices = () => loader(serviceFolder);

const configFolder = path.join(_dirname, '/../../../../src/config');
const loadConfig = () => loader(configFolder);

module.exports = {
  loadControllers,
  loadServices,
  loadConfig
};
