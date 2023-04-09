const express = require("express");
const router = express.Router();
const home_controller = require("../controllers/home.controller.js");

router.get("/", home_controller.getRooms)
router.post("/", home_controller.addRoom)

module.exports = router;