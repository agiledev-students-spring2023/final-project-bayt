const alertsData = require("../../front-end/src/json/task_list.json");
const userData = require("../../HardCode.json");
const fs = require("fs");
const path = require("path");
const alertsDataPath = path.join(__dirname, "../../front-end/src/json/task_list.json");

async function getAlerts() {
  const user = userData;
  const filteredAlerts = alertsData
    .filter((alert) => {
      return !alert.complete && alert.assignee === user.username;
    })
    .map((alert) => {
      const timestamp = alert.due_time.$date.$numberLong;
      const date = new Date(timestamp).toLocaleDateString("en-US");
      return {
        task: alert.task_name,
        date: date,
      };
    });
  return filteredAlerts;
}

async function updateAlert(alertId, updatedAlert) {
    const alertsData = JSON.parse(fs.readFileSync(alertsDataPath));
    const indexToUpdate = alertsData.findIndex((alert) => alert.id === alertId);
    let message = "Error in updating alert";
    if (indexToUpdate !== -1) {
      alertsData[indexToUpdate] = updatedAlert;
      fs.writeFileSync(alertsDataPath, JSON.stringify(alertsData, null, 2));
      message = "Alert updated successfully";
    }
    return message;
  }

module.exports = {
  getAlerts,
  updateAlert,
};
