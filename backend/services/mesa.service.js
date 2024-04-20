const db = require('../database/mongodb');

async function AddMesa(data){
    return await db.AddMesa(data);
}
async function UpdateStatusMesa(data){
    return await db.UpdateStatusMesa(data);
}
async function GetMesas(){
    return await db.GetMesas();
}
async function GetMesaById(id){
    return await db.GetMesaById(id);
}
async function DeleteMesa(id){
    return await db.DeleteMesa(id);
}
async function CloseMesas(){
    return await db.CloseMesas();
}
module.exports = {
    AddMesa,
    UpdateStatusMesa,
    GetMesas,
    GetMesaById,
    DeleteMesa,
    CloseMesas
}