import express from 'express';
import {MongoClient, ObjectId, Db} from 'mongodb';
import {Article} from './interfaces/article';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, {useUnifiedTopology: true});
let db: Db;

(async () => {
  try {
    await client.connect();
    db = client.db('gestion-stock');
  } catch (err) {
    console.log('err: ', err);
  }
})();

function remap(article: Article) {
  article.id = (article as any)._id;
  delete (article as any)._id;
}

function remapAll(articles: Article[]) {
  articles.forEach(a => remap(a));
}

const app = express.Router();
export const api = app;

app.get('/articles', (req, res) => {
  (async () => {
    const articles: Article[] = await db
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
    const r = await db.collection('articles').insertOne(article);
    const a = r.ops[0];
    remap(a);
    res.json(a);
  })();
});

app.delete('/articles', (req, res) => {
  (async () => {
    const ids = req.body as string[];
    const objectIds = ids.map(id => new ObjectId(id));
    await db.collection('articles').deleteMany({
      _id: {
        $in: objectIds,
      },
    });
    res.status(204).end();
  })();
});
