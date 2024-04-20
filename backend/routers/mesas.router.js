const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const mesaController = require('../controllers/mesa.controller');

//REST
//GET
router.get('/:id',upload.none(),mesaController.GetMesaById);
router.get('/',upload.none(),mesaController.Getmesas);
//POST
router.post('/add',upload.none(),mesaController.AddMesa);
//PUT
router.put('/change/:id',upload.none(),mesaController.UpdateStatusMesa);
router.put('/close',upload.none(),mesaController.CloseMesas);
//DELETE
router.delete('/delete/:id',upload.none(),mesaController.DeleteMesa);

module.exports = router;