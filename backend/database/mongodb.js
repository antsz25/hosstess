require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb');
const _url = process.env.DATABASE_URI;
const _dbName = process.env.DATABASE_NAME;

const connection = new MongoClient(_url);
const dbConnection = connection.db(_dbName, {useUnifiedTopology: true});

//Logica de usuario
async function CreateUser(data){
  const result = await dbConnection.collection("users").insertOne(data);
  return result;
}
async function FindUserByEmail(email){
  const result = await dbConnection.collection("users").findOne({email: email});
  return result;
}
async function LoginUsuario(data){
  let find = await FindUserByUsername(data);
  if(find){return find}
  find = await FindUserByEmail(data);
  if(find){return find}
  return null;
}
async function FindUserByRole(role){
  const result = await dbConnection.collection("users").findOne({role});
  return result;
}
async function FindUserByUsername(username){
  const result = await dbConnection.collection("users").findOne({username: username});
  return result;
}
//Logica de Mesas
async function AddMesa(data){
  const result = await dbConnection.collection("mesas").insertOne(data);
  return result;
}
async function UpdateStatusMesa(id,data){
  const result = await dbConnection.collection("mesas").updateOne({numero: parseInt(id)}, {$set: {disponible: data.disponible, mesero: data.mesero, personaTitular: data.personaTitular}});
  return result;
}
async function Getmesas(){
  const result = await dbConnection.collection("mesas").find().toArray();
  return result;
}
async function GetMesaById(id){
  const result = await dbConnection.collection("mesas").findOne({numero: id});
  return result;
}
async function DeleteMesa(id){
  const result = await dbConnection.collection("mesas").deleteOne({numero: id});
  return result;
}
async function CloseMesas(){
  const result = await dbConnection.collection("mesas").updateMany({}, {$set: {disponible: false, personaTitular: null}});
  return result;
}
module.exports = {
    CreateUser,
    FindUserByEmail,
    LoginUsuario,
    AddMesa,
    UpdateStatusMesa,
    Getmesas,
    GetMesaById,
    DeleteMesa,
    CloseMesas,
    FindUserByRole,
    FindUserByUsername
};