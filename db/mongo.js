const { MongoClient } = require('mongodb');

module.exports.connectToDatabase = async () => {
  const client = new MongoClient(process.env.DB_URL);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  module.exports = {
    client,
    db,
  };

  return { client, db };
};
