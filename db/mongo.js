const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URL);
let db;

module.exports.connectToDatabase = async () => {
  await client.connect();
  db = client.db(process.env.DB_NAME);

  module.exports = {
    client,
    db,
  };

  return { client, db };
};
