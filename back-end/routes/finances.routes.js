const express = require("express");
const router = express.Router();
const finances_controller = require("../controllers/finances.controller.js");

router.get("/", finances_controller.getAllTransactions);
router.post("/", finances_controller.addTransaction);

module.exports = router;
