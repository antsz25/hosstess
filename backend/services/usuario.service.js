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
async function FindUserByRole(role){
    return await db.FindUserByRole(role);
}
async function FindUserByUsername(username){
    return await db.FindUserByUsername(username);
}


module.exports = {
    CreateUser,
    FindUserByEmail,
    LoginUsuario,
    FindUserByRole,
    FindUserByUsername
}