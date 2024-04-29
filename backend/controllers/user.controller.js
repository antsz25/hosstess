const schema = require('../models/usuario.model');
const service = require('../services/usuario.service');
const hasher = require('../utils/bcrypt.utils');
const jwtCreator = require('../utils/jwt.utils');
//Creacion del usuario
const CreateUser = async (req, res)=>{
    try{
        let {error, value} = schema.validate(req.body);
        if(error){
            return res.status(400).send(error.message);
        }
        if(await service.FindUserByEmail(value.email)){
            return res.status(400).send("Usuario con el correo ya registrado");
        }
        value.password = await hasher.hashPassword(value.password); // Encriptacion de contraseña
        await service.CreateUser(value);
        return res.status(201).send("Usuario creado con exito");
    }catch(error){
        return res.status(500).send(error.message);
    }
};
//Encontrar a usuario por email
const FindUserByEmail = async(req,res)=>{
    try{
        const search = await service.FindUserByEmail(req.body.email);
        if(search){
            return res.status(200).send(search);
        }
        else{
            return res.status(404).send("Usuario no encontrado")
        }
    }catch(error){
        return res.status(500).send(error);
    }
}
//Login
const LoginUsuario = async(req,res,next) =>{
    try{
        const search = await service.LoginUsuario(req.body.data);
        if(search){
            const compare = await hasher.checkPassword(req.body.password,search.password);
            if(compare){
                //Creacion del JWT y cookie de usuario
                const token = await jwtCreator.generateJWT({
                    userId:search.username,
                    userRole:search.role
                });
                req.token = token;
                req.role = search.role;
                next();
                return
            }
        }
        return res.status(404).send("Correo o contraseña incorrecta");
    }catch(error){
        console.error(error.message);
        return res.status(500).send(error.message);
    }
}
//Encontrar a meseros
const FindUserByRole = async(req,res)=>{
    try{
        if(req.params.role != "waiter"){ return;}
        const search = await service.FindUserByRole(req.params.role);
        if(search){
            return res.status(200).send(search);
        }
        else{
            return res.status(404).send("Meseros no encontrados");
        }
    }catch(err){
        console.error(err);
        return res.status(500).send(err);
    }

}
const FindUserByUsername = async(req,res)=>{
    try{
        const search = await service.FindUserByUsername(req.body.username);
        if(search){
            return res.status(200).send(search);
        }
        else{
            return res.status(404).send("Usuario no encontrado");
        }
    }catch(err){
        console.error(err);
        return res.status(500).send(err);
    }

}
module.exports ={
    CreateUser,
    FindUserByEmail,
    LoginUsuario,
    FindUserByRole,
    FindUserByUsername
};