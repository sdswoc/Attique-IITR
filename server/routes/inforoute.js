const express = require("express");
const router = express.Router();
const infocontroller=require('../controllers/infocontroller')

router.get('/',infocontroller.view)
router.post('/addacadpost',infocontroller.addacad)
router.post('/filteracad',infocontroller.filteracad)

module.exports = router;
