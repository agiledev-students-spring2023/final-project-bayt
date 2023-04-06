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
        id: alert.id,
      };
    });
  return filteredAlerts;
}

function logAlertState(alertId, isChecked) {
  console.log(`Alert ID: ${alertId}, Checked: ${isChecked}`);
  const alertIndex = alertsData.findIndex(alert => alert.id.$oid === alertId.$oid);
  if (alertIndex >= 0) {
    alertsData[alertIndex].complete = isChecked;
    fs.writeFileSync(alertsDataPath, JSON.stringify(alertsData));
  }
}


module.exports = {
  getAlerts,
  logAlertState,
};
