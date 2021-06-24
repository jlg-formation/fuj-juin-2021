import { MongoClient } from "mongodb";

(async () => {
  try {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
    } finally {
      await client.close();
      console.log("closed.");
    }
  } catch (err) {
    console.log("err: ", err);
  }
})();
