const express = require("express");
const router = express.Router();
const dashcontroller = require("../controllers/dashcontroller.js");
router.get("/", dashcontroller.view);

module.exports = router;
