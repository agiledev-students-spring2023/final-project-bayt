const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task.controller.js');

router.get('/', task_controller.getTasks);
router.get('/:id', task_controller.getTask);
router.post('/', task_controller.create);
router.put('/', task_controller.update);
router.delete('/:id', task_controller.remove);