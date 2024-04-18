require('dotenv').config();
const JWT = require('jsonwebtoken')
const secret = process.env.SECRET_KEY;

const generateJWT = (payload) =>{
    try{
        return JWT.sign(payload, secret, {expiresIn:'24h'});
    }catch(error){
        console.error(error);
    }
};
const verifyToken = (token) =>{
    try{
        const jwt = token.split(' ')[1];
        return JWT.verify(jwt,secret);
    }catch(error){
        return null;
    }
};
module.exports ={
    generateJWT,
    verifyToken
}
