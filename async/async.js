const fs = require("fs");
const path = require("path");

const dir = ".";
const myFile = path.resolve(dir, "toto.txt");

fs.readdir(dir, (err, result) => {
  if (err) {
    console.log("err: ", err);
    return;
  }
  console.log("result: ", result);
  fs.writeFile(myFile, "titi", (err) => {
    if (err) {
      console.log("err: ", err);
      return;
    }
    fs.readFile(
      myFile,
      {
        encoding: "utf-8",
      },
      (err, content) => {
        if (err) {
          console.log("err: ", err);
          return;
        }
        console.log("content: ", content);
        fs.unlink(myFile, (err) => {
          if (err) {
            console.log("err: ", err);
            return;
          }
        });
      }
    );
  });
});
