const db = require('../database/mongodb');

async function AddWaiter(data){
    return await db.AddWaiter(data);
}
async function GetWaiters(){
    return await db.GetWaiters();
}
async function GetWaiterByCellphone(id){
    return await db.GetWaiterByCellphone(id);
}
async function GetWaiterByDisponibility(disponibility){
    return await db.GetWaiterByDisponibility(disponibility);
}
async function DeleteWaiter(id){
    return await db.DeleteWaiter(id);
}
async function UpdateWaiter(id,data){
    return await db.UpdateWaiter(id,data);
}
module.exports = {
    AddWaiter,
    GetWaiters,
    GetWaiterByCellphone,
    GetWaiterByDisponibility,
    DeleteWaiter,
    UpdateWaiter
}
