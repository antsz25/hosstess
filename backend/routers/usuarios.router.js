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
    switch(role){ // Logica para el renderizado del usuario
        case "client":
            return res.status(200).send("cliente");
        case "waiter":
            return res.status(200).send("mesero");
        case "admin":
            return res.status(200).send("admin");
    }
});
/*
//PUT
router.put('/',upload.none());
//DELETE
router.delete('/',upload.none());
*/
module.exports = router;