// Import json array from task.service.js

async function getAlerts(house_id, user_id) {
  const tasks = await Task.find({ house: house_id, assignee: user_id }).lean();
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
  return filteredAlerts;
}

async function logAlertState(alertId, isChecked) {
  await Task.findByIdAndUpdate(
    alertId,
    { complete: isChecked },
    { new: true }
  );
}

module.exports = {
  getAlerts,
  logAlertState,
};
