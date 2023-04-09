const express = require("express");
const router = express.Router();
const addMembers_controller = require("../controllers/addmembers.controller.js");

router.post("/", addMembers_controller.saveUser);

module.exports = router;
