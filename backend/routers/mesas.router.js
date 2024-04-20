const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const mesaController = require('../controllers/mesa.controller');

//REST
//GET
router.get('/:id',mesaController.GetMesaById);
router.get('/all',mesaController.GetMesas);
//POST
router.post('/add',mesaController.AddMesa);
//PUT
router.put('/change',mesaController.UpdateStatusMesa);
router.put('/close',mesaController.CloseMesas);
//DELETE
router.delete('/delete/:id',mesaController.DeleteMesa);

module.exports = router;