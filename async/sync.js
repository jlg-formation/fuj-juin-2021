const fs = require("fs");
const path = require("path");

const dir = ".";
const myFile = path.resolve(dir, "toto.txt");

try {
  const files = fs.readdirSync(dir);
  console.log("files: ", files);
  fs.writeFileSync(myFile, "titi");
  const content = fs.readFileSync(myFile, {
    encoding: "utf-8",
  });
  console.log("content: ", content);
  fs.unlinkSync(myFile);
} catch (err) {
  console.log("err: ", err);
}
