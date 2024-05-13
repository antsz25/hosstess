const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const meseroController = require('../controllers/mesero.controller');
//REST
//GET
router.get('/',upload.none(), meseroController.GetWaiters);
router.get('/:cellphone',upload.none(), meseroController.GetWaiterByCellphone);
router.get('/dispon/:disponibility',upload.none(), meseroController.GetWaiterByDisponibility);
//POST
router.post('/add',upload.none(), meseroController.AddWaiter);
//PUT
router.put('/:cellphone',upload.none(), meseroController.UpdateWaiter);
//DELETE
router.delete('/:cellphone',upload.none(), meseroController.DeleteWaiter);
module.exports = router;