import {Db, MongoClient} from 'mongodb';

const uri =
  process.env.GSTOCK_MONGO_URL || 'mongodb://localhost:27017/gestion-stock';
// 'mongodb://toto4:titi@MW31:27017/gestion-stock';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: +(process.env.GSTOCK_MONGO_TIMEOUT || 5000),
});

export class DbServer {
  db!: Db;
  async start() {
    try {
      console.time('initdb');
      console.log('about to connect to ' + uri);
      await client.connect();
      console.timeLog('initdb', 'sucessfull');
      this.db = client.db('gestion-stock');
    } catch (err) {
      console.timeLog('initdb', 'error');
      console.log('err: ', err);
    } finally {
      console.timeEnd('initdb');
    }
  }
  async stop() {
    await client.close();
  }
}
