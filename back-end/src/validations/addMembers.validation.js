const { checkSchema } = require('express-validator');

const addMembersDataValidationSchema = {
    username: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "username is a required field",
    },

    email: {
        in: ["body"],
        exists: true,
        isEmail: true,
        notEmpty: true,
        normalizeEmail: true,
        errorMessage: "email must be a valid email address",
    },

    password: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "housecode is a required field",
    }
}


module.exports = {
    addMembersDataValidationSchema: checkSchema(addMembersDataValidationSchema)
}
