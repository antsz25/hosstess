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
  const result = await dbConnection.collection("mesas").updateOne({numero: parseInt(id)}, {$set: data});
  return result;
}
async function Getmesas(){
  const result = await dbConnection.collection("mesas").find().toArray();
  return result;
}
async function GetMesaById(id){
  const result = await dbConnection.collection("mesas").findOne({nombre: id});
  if(!result){
    return await dbConnection.collection("mesas").findOne({numero: parseInt(id)});
  }
  return result;
}
async function GetMesaFreeWaiter(){
  const result = await dbConnection.collection("mesas").find({mesero: null}).toArray();
  return result;
}
async function DeleteMesa(id){
  const result = await dbConnection.collection("mesas").deleteOne({numero: parseInt(id)});
  return result;
}
async function CloseMesas(){
  const result = await dbConnection.collection("mesas").updateMany({}, {$set: {disponible: false, personaTitular: null}});
  return result;
}
//Logica de meseros
async function AddWaiter(data){
  const result = await dbConnection.collection("waiters").insertOne(data);
  return result;
}
async function GetWaiters(){
  const result = await dbConnection.collection("waiters").find().toArray();
  return result;
}
async function GetWaiterByCellphone(id){
  const result = await dbConnection.collection("waiters").findOne({cellphone: id});
  return result;
}
async function GetWaiterByDisponibility(disponibility){
  const result = await dbConnection.collection("waiters").findOne({status: disponibility});
  return result;
}
async function DeleteWaiter(id){
  const result = await dbConnection.collection("waiters").deleteOne({cellphone: id});
  return result;
}
async function UpdateWaiter(id,data){
  const result = await dbConnection.collection("waiters").updateOne({cellphone: id}, {$set: data});
  return result;
}
//Logica de WaitList
async function AddWaitList(data){
  const result = await dbConnection.collection("waitlist").insertOne(data);
  return result;
}
async function GetWaitList(){
  const result = await dbConnection.collection("waitlist").find().toArray();
  return result;
}
async function GetWaitListByNumber(number){
  const result = await dbConnection.collection("waitlist").findOne({cellphone: parseInt(number)});
  return result;
}
async function DeleteWaitList(id){
  const result = await dbConnection.collection("waitlist").deleteOne({cellphone: parseInt(number)});
  return result;
}
async function UpdateWaitList(id,data){
  const result = await dbConnection.collection("waitlist").updateOne({cellphone: parseInt(number)}, {$set: data});
  return result;
}



module.exports = {
    CreateUser,
    FindUserByEmail,
    LoginUsuario,
    AddMesa,
    UpdateStatusMesa,
    Getmesas,
    GetMesaFreeWaiter,
    GetMesaById,
    DeleteMesa,
    CloseMesas,
    FindUserByUsername,
    AddWaiter,
    GetWaiters,
    GetWaiterByCellphone,
    GetWaiterByDisponibility,
    DeleteWaiter,
    UpdateWaiter,
    AddWaitList,
    GetWaitList,
    GetWaitListByNumber,
    DeleteWaitList,
    UpdateWaitList

};