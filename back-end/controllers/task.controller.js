const taskService = require("../services/task.service.js");

// get task by id taskSer
async function get(req, res) {
  const task = await taskService.getTask(req.params.id);
  res.json(task);
}

// list all tasks in the database
async function gets(req, res) {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch {
    console.error("Error in getting tasks");
  }
}

// create a task and add it to the database
async function create(req, res) {
  try {
    const task = await taskService.createTask(req.body);
    res.json(task);
  } catch {
    console.error("Error in creating task");
  }
}

// remove a task from the database
async function remove(req, res) {
    try {
        const task = await taskService.removeTask(req.params.id);
        res.json(task);
    } catch {
        console.error("Error in deleting task");
    }
}

// update a task in the database
async function update(req, res) {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        res.json(task);
    } catch {
        console.error("Error in updating task");
    }
}

module.exports = {
    get,
    gets,
    create,
    update,
    remove,
  };