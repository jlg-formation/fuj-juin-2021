import express from 'express';
import {ObjectId} from 'mongodb';
import {DbServer} from './DbServer';
import {Article} from './interfaces/article';

function remap(article: Article) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  article.id = (article as any)._id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (article as any)._id;
}

function remapAll(articles: Article[]) {
  articles.forEach(a => remap(a));
}

export function api(dbServer: DbServer) {
  const app = express.Router();

  app.get('/articles', (req, res) => {
    (async () => {
      const articles: Article[] = await dbServer.db
        .collection('articles')
        .find({})
        .toArray();
      remapAll(articles);
      res.json(articles);
    })();
  });

  app.use(express.json());

  app.post('/articles', (req, res) => {
    (async () => {
      const article = req.body as Article;
      const r = await dbServer.db.collection('articles').insertOne(article);
      const a = r.ops[0];
      remap(a);
      res.json(a);
    })();
  });

  app.delete('/articles', (req, res) => {
    (async () => {
      const ids = req.body as string[];
      const objectIds = ids.map(id => new ObjectId(id));
      await dbServer.db.collection('articles').deleteMany({
        _id: {
          $in: objectIds,
        },
      });
      res.status(204).end();
    })();
  });

  return app;
}
