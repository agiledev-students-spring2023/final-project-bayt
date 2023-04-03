// SERVICE HARDCODED(AT LEAST TEMPORARILY) TASK DATA

const tasksData = require('../../front-end/src/json/task_list.json');
let task_json = tasksData;

async function getTasks() {
  return task_json;
}

async function getTask(task_id) {
  return task_json.find((task) => task.id.$oid === task_id);
}

// add task data to task data json array if it does not exist
async function createTask(task_data) {
  const task = await getTask(task_data.id.$oid);
  let message = "Task already exists";
  if (task === undefined) {
    task_json.push(task_data);
    message = "Task created successfully";
  }
  return message;
}

// find and update the task data array based off task_data json object
async function updateTask(task_id, task_data) {
  let message = "Error in updating task";
  const indexToUpdate = task_json.findIndex((task) => task.id.$oid === task_id);
  if(indexToUpdate !== -1) {
    task_json[indexToUpdate] = task_data;
    message = "Task updated successfully";
  }
  return message;
}

async function removeTask(task_id) {
  const indexToRemove = task_json.findIndex((task) => task.id.$oid === task_id);
  let message = "Error in deleting task";
  if (indexToRemove !== -1) {
    task_json.splice(indexToRemove, 1);
    message = "Task deleted successfully";
  }

  return message;
}

module.exports = {
  getTask,
  getTasks,
  createTask,
  updateTask,
  removeTask,
};