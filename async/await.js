const fs = require("fs").promises;
const path = require("path");

const dir = ".";
const myFile = path.resolve(dir, "toto.txt");

const main = async () => {
  try {
    const files = await fs.readdir(dir);
    console.log("files: ", files);
    await fs.writeFile(myFile, "titi");
    const content = await fs.readFile(myFile, {
      encoding: "utf-8",
    });
    console.log("content: ", content);
    await fs.unlink(myFile);
  } catch (err) {
    console.log("err: ", err);
  }
};

main();
