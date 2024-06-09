const express = require('express');
const router = express.Router();

const alertsController = require("../controllers/alerts.controller.js");

router.get('/', alertsController.getAlerts);
router.post("/update", alertsController.updateAlertState);

module.exports = router;