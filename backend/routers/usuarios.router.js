const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const userController = require('../controllers/user.controller');

//REST
//GET
router.get('/find',upload.none(),userController.FindUserByEmail);
router.get('/waitlist/',upload.none(),userController.GetWaitList);
//POST
router.post('/register',upload.none(),userController.CreateUser);
router.post('/login',upload.none(),userController.LoginUsuario, (req,res)=>{
    const role = req.role;
    const token = req.token;
    switch(role){ // Logica para el renderizado del usuario
        case "hosstess":
            return res.status(200).send({token: token, role: "hosstess"});
        case "admin":
            return res.status(200).send({token: token, role: "admin"});
    }
});
router.post('/waitlist/add',upload.none(),userController.AddWaitList);
//DELETE
router.delete('/waitlist/delete/:id',upload.none(),userController.DeleteWaitList);
module.exports = router;