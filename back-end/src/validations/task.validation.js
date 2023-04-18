const { checkSchema } = require("express-validator");
// Schema to validate data for task update so not all fields are required

// Validate data using express-validator validator schemas following the schema defined in task.list.model.js
const taskDataValidationSchema = {
    task_name: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "task_name must be a string",
    },
    description: {
        in: ["body"],
        exists: true,
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "description must be a string",
    },
    room: {
        in: ["body"],
        exists: true,
        isString: true,
        // notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: "room must be a string",
    },
    assignee: {
        in: ["body"],
        exists: true,
        isString: true,
        trim: true,
        escape: true,
        errorMessage: "assignee must be a string",
    },
    //needs to be mongodb date type
    due_time: {
        in: ["body"],
        exists: true,
        isInt: true,
        notEmpty: true,
        errorMessage: "due_time must be a date",
    },
    complete: {
        in: ["body"],
        exists: true,
        isBoolean: true,
        notEmpty: true,
        errorMessage: "complete must be a boolean",
    },
    repeat: {
        in: ["body"],
        exists: true,
        isInt: true,
        notEmpty: true,
        errorMessage: "repeat must be an integer",
    },
};

// Same like the json above but we set all fields to optional
const taskDataUpdateValidationSchema = Object.keys(taskDataValidationSchema).reduce((acc, key) => {
    acc[key] = { ...taskDataValidationSchema[key], optional: true };
    return acc;
}, {});

// Schema to make sure a valid mongodb task id is provided
const taskIDValidationSchema = {
    id: {
        in: ["params"],
        exists: true,
        isMongoId: true,
        notEmpty: true,
        errorMessage: "id must be a valid mongodb id",
    },
};
// export the schema middleware functions using checkSchema
module.exports = {
    taskDataValidationSchema: checkSchema(taskDataValidationSchema),
    taskIDValidationSchema: checkSchema(taskIDValidationSchema),
    taskDataUpdateValidationSchema: checkSchema(taskDataUpdateValidationSchema),
};
