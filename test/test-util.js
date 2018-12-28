import fs from 'fs';

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, _) => {
      const currPath = path + '/' + file;
      if (fs.lstatSync(currPath).isDirectory()) {
        deleteFolderRecursive(currPath);
      } else fs.unlinkSync(currPath);
    });
    fs.rmdirSync(path);
  }
};

export {
  deleteFolderRecursive
};
