const { checkSchema } = require("express-validator");

const roomDataValidationSchema = {
    roomName: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        errorMessage: "room name must be a string",
    },
    url: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        errorMessage: "url did not generate",
    },
    home: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        errorMessage: "home name not added",
    }
};

module.exports = {
    roomDataValidationSchema: checkSchema(roomDataValidationSchema)
}