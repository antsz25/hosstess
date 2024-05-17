const db = require('../database/mongodb');

async function CreateUser(data){
   return await db.CreateUser(data);
}

async function FindUserByEmail(email){
    return await db.FindUserByEmail(email);
}
async function LoginUsuario(data){
    return await db.LoginUsuario(data);
}
async function FindWaiters(){
    return await db.FindWaiters();
}
async function FindUserByUsername(username){
    return await db.FindUserByUsername(username);
}
async function AddWaitList(data){
    return await db.AddWaitList(data);
}
async function DeleteWaitList(id){
    return await db.DeleteWaitList(id);
}
async function GetWaitList(){
    return await db.GetWaitList();
}

module.exports = {
    CreateUser,
    FindUserByEmail,
    LoginUsuario,
    FindUserByUsername,
    FindWaiters,
    AddWaitList,
    DeleteWaitList,
    GetWaitList
}