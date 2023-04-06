const alertsService = require("../services/alerts.service.js");

const getAlerts = async (req, res, next) => {
  try {
    const alerts = await alertsService.getAlerts();
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

async function updateAlert(req, res) {
  const alertId = req.params.id;
  const updatedAlert = req.body;
  const message = await alertsService.updateAlert(alertId, updatedAlert);
  res.send({ message });
}

module.exports = {
  getAlerts,
  updateAlert
};
