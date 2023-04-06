const express = require("express");
const router = express.Router();
const settings_controller = require("../controllers/settings.controller.js");

router.get('/', settings_controller.gets);

module.exports = router;
