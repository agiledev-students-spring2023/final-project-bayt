const express = require('express');
const router = express.Router();
const cookie_controller = require('../controllers/cookie.controller.js');

router.get('/set', cookie_controller.setCookie);

module.exports = router;