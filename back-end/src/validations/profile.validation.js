const { checkSchema } = require('express-validator');

const profileInfoDataValidationSchema = {
    first_name: {
        in: ["body"],
        optional: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "firstname must be a non-empty string",
    },
    last_name: {
        in: ["body"],
        optional: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "lastname must be a non-empty string",
    },
    email: {
        in: ["body"],
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "email must be a valid email address",
    },
    role: {
        in: ["body"],
        optional: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "household_role must be a non-empty string",
    }
};

//still need to add validation for profile picture but this is somewhat complicated.  Will figure it out eventually.    


module.exports = {
    profileInfoDataValidationSchema: checkSchema(profileInfoDataValidationSchema)
}