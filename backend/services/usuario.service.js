const db = require('../database/mongodb');

async function CreateUser(data){
   return await db.CreateUser(data);
}

async function FindUserByEmail(email){
    return await db.FindUserByEmail(email);
}

async function LoginUsuario(email){
    return await db.LoginUsuario(email);
}
async function FindUserByRole(role){
    return await db.FinderUserByRole(role);
}


module.exports = {
    CreateUser,
    FindUserByEmail,
    LoginUsuario,
    FindUserByRole
}