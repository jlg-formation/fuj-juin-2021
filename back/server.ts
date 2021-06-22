import express from "express";
import serveIndex from "serve-index";

const app = express();
const port = +(process.env.GSTOCK_PORT || "3000");
const publicDir = process.env.GSTOCK_DIR || "./public";

app.use(express.static(publicDir));
app.use(serveIndex(publicDir));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
