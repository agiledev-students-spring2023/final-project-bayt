const express = require('express');
const router = express.Router();
const prof_controller = require('../controllers/prof.controller.js');



router.get('/', prof_controller.gets);
router.post('/', prof_controller.update);
module.exports = router;