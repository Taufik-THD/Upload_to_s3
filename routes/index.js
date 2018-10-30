var express = require('express');
var router = express.Router();
const { upload } = require('../Controllers/upload_image')

/* GET home page. */
router.get('/', (req, res) => {
  return res.status(200).json('success')
})

router.post('/', upload);

module.exports = router;
