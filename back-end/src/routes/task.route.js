const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task.controller.js');

const { taskDataValidationSchema, taskIDValidationSchema } = require("../validations/task.validation.js");
const validate = require("../middleware/validation.middleware.js");

// Create routes and validate/sanitize data before passing to controller
router.get('/', task_controller.gets);
router.get('/:id', taskIDValidationSchema, validate, task_controller.get);
router.post('/', taskDataValidationSchema, validate, task_controller.create);
router.put('/:id', taskDataValidationSchema, validate, task_controller.update);
router.delete('/:id', taskIDValidationSchema, validate, task_controller.remove);

module.exports = router;
