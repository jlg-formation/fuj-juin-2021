import express from 'express';
import serveIndex from 'serve-index';
import cors from 'cors';
import path from 'path';

import {api} from './api-mongo';

const app = express();
const port = +(process.env.GSTOCK_PORT || '3000');
const publicDir =
  process.env.GSTOCK_DIR || path.resolve(process.cwd(), './public');
const angularDir = path.resolve(process.cwd(), '../front/dist/front');

app.use(cors());

app.use('/api', api);

app.use(express.static(angularDir));
app.use(serveIndex(angularDir));

app.use(express.static(publicDir));
app.use(serveIndex(publicDir));

app.use((req, res) => {
  res.sendFile(path.resolve(angularDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
