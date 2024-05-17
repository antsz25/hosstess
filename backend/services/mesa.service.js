const db = require('../database/mongodb');

async function AddMesa(data){
    return await db.AddMesa(data);
}
async function UpdateStatusMesa(id,data){
    return await db.UpdateStatusMesa(id,data);
}
async function GetMesaFreeWaiter(disponibility){
    return await db.GetMesaFreeWaiter(disponibility);
}
async function Getmesas(){
    return await db.Getmesas();
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
    Getmesas,
    GetMesaById,
    DeleteMesa,
    CloseMesas,
    GetMesaFreeWaiter
}