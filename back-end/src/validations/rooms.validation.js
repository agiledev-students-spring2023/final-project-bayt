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
    }
};

module.exports = {
    roomDataValidationSchema: checkSchema(roomDataValidationSchema)
}