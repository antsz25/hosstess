const router = require('express').Router();
const multer = require('multer');
const upload = multer();

//REST
router.get('/',upload.none());
router.post('/',upload.none());
router.put('/',upload.none());
router.delete('/',upload.none());

module.exports = router;