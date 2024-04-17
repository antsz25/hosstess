require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb');
const _url = process.env.DATABASE_URI;
const _dbName = process.env.DATABASE_NAME;

const connection = new MongoClient(_url);
const dbConnection = connection.db(_dbName, {useUnifiedTopology: true});

async function getCollection(collectionName) {
  const result = await dbConnection.collection(collectionName).find().toArray();
  return result;
}
module.exports = {
    getCollection
};