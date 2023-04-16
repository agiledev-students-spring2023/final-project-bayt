// Import json array from task.service.js
let {task_json} = require("./task.service.js")
const userData = require("../json/hardcode.json");

async function getAlerts() {
  const user = userData;
  const filteredAlerts = task_json
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

async function logAlertState(alertId, isChecked) {
  // console.log(`Alert ID: ${alertId}, Checked: ${isChecked}`);
  const alertIndex = task_json.findIndex(alert => alert.id.$oid === alertId.$oid);
  if (alertIndex>=0) {
    task_json[alertIndex].complete = isChecked;
  }
}


module.exports = {
  getAlerts,
  logAlertState,
};