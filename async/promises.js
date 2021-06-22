const fs = require("fs");
const path = require("path");

const promises = fs.promises;
const dir = ".";
const myFile = path.resolve(dir, "toto.txt");

const readdir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

readdir(dir)
  .then((result) => {
    console.log("result: ", result);
    return promises.writeFile(myFile, "titi");
  })
  .then(() => {
    return promises.readFile(myFile, {
      encoding: "utf-8",
    });
  })
  .then((content) => {
    console.log("content: ", content);
    return promises.unlink(myFile);
  })
  .catch((err) => console.log("err: ", err));
