const { checkSchema } = require("express-validator");

const transactionValidationSchema = checkSchema({
  paidOrRequesting: {
    in: ['body'],
    isString: true,
    isIn: {
      options: [['Paid', 'Requesting']],
      errorMessage: 'paidOrRequesting must be either "Paid" or "Requesting"'
    }
  },
  amount: {
    in: ['body'],
    isNumeric: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: 'amount must be greater than or equal to 0'
    }
  },
  toOrFrom: {
    in: ['body'],
    isString: true,
    isIn: {
      options: [['to', 'from']],
      errorMessage: 'toOrFrom must be either "to" or "from"'
    }
  },
  user: {
    in: ['body'],
    isString: true,
    notEmpty: true
  },
  forWhat: {
    in: ['body'],
    isString: true,
    notEmpty: true
  },
  date: {
    in: ['body'],
    isDate: true,
    toDate: true
  }
});

module.exports = transactionValidationSchema;
