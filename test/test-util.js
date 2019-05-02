import fs from 'fs';

const rm = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, _) => {
      const currPath = `${path}/${file}`;
      if (fs.lstatSync(currPath).isDirectory()) rm(currPath);
      else fs.unlinkSync(currPath);
    });
    fs.rmdirSync(path);
  }
};

export default rm;
