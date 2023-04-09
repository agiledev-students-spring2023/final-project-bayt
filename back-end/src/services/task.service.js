// SERVICE HARDCODED(AT LEAST TEMPORARILY) TASK DATA
let task_json = require('../json/tasklist.json')

async function getTasks() {
  return task_json;
}

async function getTask(task_id) {
  return task_json.find((task) => task.id.$oid === task_id);
}

// add task data to task data json array if it does not exist
async function createTask(task_data) {
  if(task_data.hasOwnProperty("id") === false) throw new Error("Task id not found");
  const task = await getTask(task_data.id.$oid);
  if (task !== undefined) throw new Error("Task already exists");
  task_json.push(task_data);
  return "Task created successfully";
}

// find and update the task data array based off task_data json object
async function updateTask(task_id, task_data) {
  const indexToUpdate = task_json.findIndex((task) => task.id.$oid === task_id);
  if (indexToUpdate === -1) throw new Error("Error in updating task");
  task_json[indexToUpdate] = task_data;
  return "Task updated successfully";
}

async function removeTask(task_id) {
  const indexToRemove = task_json.findIndex((task) => task.id.$oid === task_id);
  if (indexToRemove === -1) throw new Error("Error in deleting task");
  task_json.splice(indexToRemove, 1);
  return "Task deleted successfully";
}

module.exports = {
  getTask,
  getTasks,
  createTask,
  updateTask,
  removeTask,
};