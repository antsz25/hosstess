const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const userController = require('../controllers/user.controller');

//REST
router.get('/',upload.none(), userController.getCollection);

router.post('/',upload.none());

router.put('/',upload.none());

router.delete('/',upload.none());

module.exports = router;