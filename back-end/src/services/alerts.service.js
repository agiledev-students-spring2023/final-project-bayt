// Import json array from task.service.js
let { task_json } = require("./task.service.js");
const userData = require("../json/hardcode.json");
const tasks = require("../models/task.list.model.js");

async function getAlerts(house_id, username) {
  const tasks = await Task.find({ house: house_id, assignee: username }).lean();
  const filteredAlerts = tasks
    .filter((task) => !task.complete)
    .map((task) => {
      const date = new Date(task.due_time).toLocaleDateString("en-US");
      return {
        task: task.task_name,
        date: date,
        _id: task._id,
      };
    });
  // const user = userData;
  // const filteredAlerts = task_json
  //   .filter((alert) => {
  //     return !alert.complete && alert.assignee === user.username;
  //   })
  //   .map((alert) => {
  //     const timestamp = alert.due_time;
  //     const date = new Date(timestamp).toLocaleDateString("en-US");
  //     return {
  //       task: alert.task_name,
  //       date: date,
  //       _id: alert._id,
  //     };
  //   });
  return filteredAlerts;
}

async function logAlertState(alertId, isChecked) {
  // console.log(`Alert ID: ${alertId}, Checked: ${isChecked}`);
  // const alertIndex = task_json.findIndex((alert) => alert._id === alertId);
  // if (alertIndex >= 0) {
  //   task_json[alertIndex].complete = isChecked;
  // }
  const task = await Task.findByIdAndUpdate(alertId, { complete: isChecked }, { new: true });
}

module.exports = {
  getAlerts,
  logAlertState,
};
