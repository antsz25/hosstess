require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb');
const _url = process.env.DATABASE_URI;
const _dbName = process.env.DATABASE_NAME;

const connection = new MongoClient(_url);
const dbConnection = connection.db(_dbName, {useUnifiedTopology: true});

async function CreateUser(data){
  const result = await dbConnection.collection("users").insertOne(data);
  return result;
}
async function FindUserByEmail(email){
  const result = await dbConnection.collection("users").findOne({email});
  return result;
}
async function LoginUsuario(email){
  const find = await dbConnection
  .collection("users")
  .findOne({email});
  return find;
}
module.exports = {
    CreateUser,
    FindUserByEmail,
    LoginUsuario
};