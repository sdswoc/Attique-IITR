const express = require("express");
const router = express.Router();
const infocontroller=require('../controllers/infocontroller')

router.get('/',infocontroller.view)
router.post('/addpost',infocontroller.add)

module.exports = router;
