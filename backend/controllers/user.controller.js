const schema = require('../models/usuario.model');
const service = require('../services/usuario.service');

const getCollection = async (req,res)=>{
    try{
        const data = await service.getCollection();
        return res.status(200).send(data);
    }catch(err){
        return res.status(500).send(err.message);
    }
};

module.exports ={
    getCollection
};