import cors from 'cors';
import express, {Express} from 'express';
import {Server} from 'http';
import path from 'path';
import serveIndex from 'serve-index';
import {api} from './api-mongo';
import {DbServer} from './DbServer';

export class WebServer {
  app: Express;
  server!: Server;
  dbServer = new DbServer();

  constructor(public port = 3000) {
    const app = express();
    const publicDir =
      process.env.GSTOCK_DIR || path.resolve(process.cwd(), './public');
    const angularDir = path.resolve(process.cwd(), '../front/dist/front');

    app.use(cors());

    app.use('/api', api(this.dbServer));

    app.use(express.static(angularDir));
    app.use(serveIndex(angularDir));

    app.use(express.static(publicDir));
    app.use(serveIndex(publicDir));

    app.use((req, res) => {
      res.sendFile(path.resolve(angularDir, 'index.html'));
    });

    this.app = app;
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      (async () => {
        await this.dbServer.start();
        this.server = this.app.listen(this.port, () => {
          console.log(`Example app listening at http://localhost:${this.port}`);
          resolve();
        });

        this.server.on('error', err => {
          reject(err);
        });
      })();
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close(err => {
        if (err) {
          reject(err);
          return;
        }
        this.dbServer.stop();
        resolve();
      });
    });
  }
}
