const express = require('express');
const router = express.Router();

const alertsController = require("../controllers/alerts.controller.js");

const { alertValidationSchema} = require("../validations/alert.validation.js");
const validate = require("../middleware/validation.middleware.js");

router.get('/', alertsController.getAlerts);
router.post("/update", alertValidationSchema, validate, alertsController.updateAlertState);

module.exports = router;