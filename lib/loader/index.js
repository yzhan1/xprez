const fs = require('fs');

const loader = (path) => {
  const dir = fs.readdirSync(path);

  return dir.map((file) => {
    const module = require(`${path}/${file}`);
    return { name: file.split('.')[0], module };
  });
};

const loadControllers = () => loader(__dirname + '/../../../src/controllers');

const loadServices = () => loader(__dirname + '/../../../src/services');

module.exports = {
  loadControllers,
  loadServices
};
