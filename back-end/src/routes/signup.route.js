const express = require('express');
const router = express.Router();
const signup_controller = require('../controllers/signup.controller.js');

router.post('/', signup_controller.signup);

module.exports = router;