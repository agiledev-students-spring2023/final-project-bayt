const express = require("express");
const finances_controller = require('../controllers/finances.controller.js');

const router = express.Router();

router.get("/transactions", finances_controller.getAllTransactions);
router.post("/transactions", finances_controller.addTransaction);

module.exports = router;
 