const express = require("express");
const router = express.Router();
const finances_controller = require("../controllers/finances.controller.js");
const transactionValidation = require("../validations/transaction.validation.js");

router.get("/", finances_controller.getAllTransactions);
router.post("/", transactionValidation, finances_controller.addTransaction);

module.exports = router;