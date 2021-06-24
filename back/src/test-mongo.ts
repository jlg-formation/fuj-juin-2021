import {MongoClient, ObjectId} from 'mongodb';
import {Article} from './interfaces/article';

// const sleep = (delay: number) =>
//   new Promise(resolve => setTimeout(resolve, delay));

(async () => {
  try {
    const uri = 'mongodb://localhost:27017/';
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
      await client.connect();
      const db = client.db('gestion-stock');
      await db.collection('articles').deleteMany({});

      const article: Partial<Article> = {
        name: 'Tournevis',
        price: 2.99,
        qty: 100,
      };
      const r = await db.collection('articles').insertOne(article);
      console.log('r: ', r.ops[0]);
      //   await sleep(1000);
      console.log('wake up');
      const article2: Partial<Article> = {
        name: 'Tournevis',
        price: 2.99,
        qty: 100,
      };
      const r2 = await db.collection('articles').insertOne(article2);
      console.log('r2: ', r2.ops[0]);
      const articles: Article[] = await db
        .collection('articles')
        .find({})
        .toArray();
      console.log('articles: ', articles);

      const ids: ObjectId[] = [];
      //   ids.push(new ObjectId(r.ops[0]._id));
      ids.push(new ObjectId(r2.ops[0]._id));
      console.log('ids: ', ids);
      await db.collection('articles').deleteMany({
        _id: {
          $in: ids,
        },
      });

      const articles2: Article[] = await db
        .collection('articles')
        .find({})
        .toArray();
      console.log('articles2: ', articles2);

      console.log('Connected successfully to server');
    } finally {
      await client.close();
      console.log('closed.');
    }
  } catch (err) {
    console.log('err: ', err);
  }
})();
