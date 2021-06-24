import express from "express";
import serveIndex from "serve-index";
import cors from "cors";

import { api } from "./api";

const app = express();
const port = +(process.env.GSTOCK_PORT || "3000");
const publicDir = process.env.GSTOCK_DIR || "./public";

app.use(cors());

app.use("/api", api);

app.use(express.static(publicDir));
app.use(serveIndex(publicDir));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
