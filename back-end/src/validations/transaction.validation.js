const { body } = require("express-validator");

const transactionValidation = [
  body("paidOrRequesting")
    .isString()
    .withMessage("Paid or Requesting must be a string")
    .notEmpty()
    .withMessage("Paid or Requesting is required")
    .isIn(["Paid", "Requesting"])
    .withMessage("Paid or Requesting must be either Paid or Requesting"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a positive number"),
  body("user")
    .isString()
    .withMessage("User must be a string")
    .notEmpty()
    .withMessage("User is required"),
  body("forWhat")
    .isString()
    .withMessage("For What must be a string")
    .notEmpty()
    .withMessage("For What is required"),
  body("date")
    .isDate()
    .withMessage("Date must be a valid date")
    .notEmpty()
    .withMessage("Date is required"),
];

module.exports = transactionValidation;
