const express = require('express');
const router = express.Router();
const prof_controller = require('../controllers/prof.controller.js');

const {profileInfoDataValidationSchema} = require("../validations/profile.validation.js");
const validate = require("../middleware/validation.middleware.js");

router.get('/', prof_controller.gets);
router.post('/', prof_controller.upload.single('file'), prof_controller.store);
router.put('/', profileInfoDataValidationSchema, validate, prof_controller.update);

module.exports = router;