const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = process.env.ORSYS_PORT || 3000;

app.use(express.static("."));
app.use(serveIndex("."));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
