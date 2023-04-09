const alertsService = require("../services/alerts.service.js");

const getAlerts = async (req, res, next) => {
  try {
    const alerts = await alertsService.getAlerts();
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

const updateAlertState = async (req, res, next) => {
  try {
    const { alertId, isChecked } = req.body;
    await alertsService.logAlertState(alertId, isChecked); // call logAlertState from alerts.service.js with the alertId and isChecked values
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlerts,
  updateAlertState,
};