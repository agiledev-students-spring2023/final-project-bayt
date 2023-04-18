const express = require("express");
const router = express.Router();
const finances_controller = require("../controllers/finances.controller.js");
const { transactionValidationSchema } = require("../validations/transaction.validation.js");
const validate = require("../middleware/validation.middleware.js");

router.get("/", finances_controller.getAllTransactions);
router.post("/", transactionValidationSchema, validate, finances_controller.addTransaction);

module.exports = router;