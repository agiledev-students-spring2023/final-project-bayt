const { validationResult } = require("express-validator");

//Middleware function to make sure data validated following checkschema before passing to controller
const validate = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    res.status(400).json({errors: result.array()});
};

module.exports = validate;