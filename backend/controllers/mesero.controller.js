const service = require('../services/mesero.service');
const schema = require('../models/mesero.model');

const AddWaiter = async(req,res)=>{
    try{
        let {error, value} = schema.validate(req.body);
        if(error){
            return res.status(400).send(error.message);
        }
        if(await service.GetWaiterByCellphone(value.cellphone)){
            return res.status(400).send("Mesero ya existe");
        }
        await service.AddWaiter(value);
        return res.status(201).send("Mesero agregado");
    }catch(err){
        console.error(err);
        return res.status(500).send(err.message);
    }
}
const GetWaiters = async(req,res)=>{
    try{
        let result = await service.GetWaiters();
        return res.status(200).send(result);
    }catch(err){
        console.error(err.message);
        return res.status(500).send(err.message);
    }
}
const GetWaiterByCellphone = async(req,res)=>{
    try{
        let result = await service.GetWaiterByCellphone(req.params.cellphone);
        if(!result){
            return res.status(404).send("Mesero no encontrado");
        }
        return res.status(200).send(result);
    }catch(err){
        console.error(err.message);
        return res.status(500).send(err.message);
    }
}
const GetWaiterByDisponibility = async(req,res)=>{
    try{
        let result = await service.GetWaiterByDisponibility(req.params.disponibility);
        if(!result){
            return res.status(404).send("Mesero no encontrado");
        }
        return res.status(200).send(result);
    }catch(err){
        console.error(err.message);
        return res.status(500).send(err.message);
    }
}
const DeleteWaiter = async(req,res)=>{
    try{
        let result = await service.DeleteWaiter(req.params.cellphone);
        if(!result){
            return res.status(404).send("Mesero no encontrado");
        }
        return res.status(200).send(result);
    }catch(err){
        console.error(err.message);
        return res.status(500).send(err.message);
    }
}
const UpdateWaiter = async(req,res)=>{
    try{
        let result = await service.UpdateWaiter(req.params.cellphone,req.body);
        if(!result){
            return res.status(404).send("Mesero no encontrado");
        }
        return res.status(200).send("Mesero actualizado");
    }catch(err){
        console.error(err.message);
        return res.status(500).send(err.message);
    }
}
module.exports = {
    AddWaiter,
    GetWaiters,
    GetWaiterByCellphone,
    GetWaiterByDisponibility,
    DeleteWaiter,
    UpdateWaiter
}