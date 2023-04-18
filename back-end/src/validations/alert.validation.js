const { checkSchema } = require("express-validator");

const alertValidationSchema = checkSchema({
  task: {
    notEmpty: true,
    errorMessage: "Task is required",
  },
  date: {
    notEmpty: true,
    errorMessage: "Date is required",
  },
});

module.exports = {
  alertValidationSchema,
};
