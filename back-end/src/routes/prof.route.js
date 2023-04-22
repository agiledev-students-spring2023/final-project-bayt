const express = require('express');
const router = express.Router();
const prof_controller = require('../controllers/prof.controller.js');

router.get('/:username', prof_controller.gets);
router.post('/:username', prof_controller.store);
router.put('/:username',prof_controller.update);

module.exports = router;