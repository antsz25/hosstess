const schema = require('../models/mesa.model');
const service = require('../services/mesa.service');

const AddMesa = async(req,res)=>{
    try{
        let {error, value} = schema.validate(req.body);
        if(error){
            return res.status(400).send(error);
        }
        if(await service.GetMesaById(value.nombre)){
            return res.status(400).send("Mesa ya existe");
        }
        if(await service.GetMesaById(value.numero)){
            return res.status(400).send("Mesa ya existe");
        }
        const result = await service.AddMesa(value);
        return res.status(201).send("Mesa creada");
    }catch(err){
        console.error(err);
        return res.status(500).send(err);
    }
}
const GetMesaById = async(req,res)=>{
    try{
        const result = await service.GetMesaById(req.params.id);
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
    }
}
const GetMesaFreeWaiter = async(req,res)=>{
    try{
        const result = await service.GetMesaFreeWaiter();
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
    }
}
const UpdateStatusMesa = async(req,res)=>{
    try{
        const result = await service.UpdateStatusMesa(req.params.id,req.body);
        if(result.modifiedCount === 0){
            return res.status(400).send("Mesa no existe");
        }
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
    }
}
const DeleteMesa = async(req,res)=>{
    try{
        const result = await service.DeleteMesa(req.params.id);
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
    }
}
const CloseMesas = async(res)=>{
    try{
        const result = await service.CloseMesas();
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err);
    }
}
const Getmesas = async(req,res)=>{
    try{
        const result = await service.Getmesas();
        return res.status(200).send(result);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
module.exports = {
    AddMesa,
    GetMesaById,
    Getmesas,
    GetMesaFreeWaiter,
    UpdateStatusMesa,
    DeleteMesa,
    CloseMesas
}