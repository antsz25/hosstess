const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const userController = require('../controllers/user.controller');

//REST
//GET
router.get('/find',upload.none(),userController.FindUserByEmail);
router.get('/waiters/:role', upload.none(),userController.FindUserByRole);
//POST
router.post('/register',upload.none(),userController.CreateUser);
router.post('/login',upload.none(),userController.LoginUsuario, (req,res)=>{
    const role = req.role;
    const token = req.token;
    switch(role){ // Logica para el renderizado del usuario
        case "client":
            return res.status(200).send({token: token, role: "client"});
        case "waiter":
            return res.status(200).send({token: token, role: "waiter"});
        case "admin":
            return res.status(200).send({token: token, role: "admin"});
    }
});
/*
//PUT
router.put('/',upload.none());
//DELETE
router.delete('/',upload.none());
*/
module.exports = router;