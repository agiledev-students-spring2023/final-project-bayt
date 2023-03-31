const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task.controller.js');

router.get('/', task_controller.gets);
router.get('/:id', task_controller.get);
router.post('/', task_controller.create);
router.put('/:id', task_controller.update);
router.delete('/:id', task_controller.remove);

module.exports = router;