const express = require("express");
const router = express.Router();
const infocontroller = require("../controllers/infocontroller");

router.get("/", infocontroller.view);
router.post("/addacadpost", infocontroller.addacad);
router.post("/filteracad", infocontroller.filteracad);
router.post("/deleteacad", infocontroller.deleteacad);
router.get("/filterviewacad", infocontroller.filterender);
module.exports = router;
