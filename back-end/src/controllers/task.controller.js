const taskService = require("../services/task.service.js");

// get task by id taskSer
async function get(req, res) {
  try {
    const task = await taskService.getTask(req.params.id);

    // POPULATE DATA???!
    if (process.env.NODE_ENV === 'production') {
      if (task === null) throw new Error("Task not found");
    } else {
      if (task === undefined) throw new Error("Task not found");
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// list all tasks in the database
async function gets(req, res) {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// create a task and add it to the database
async function create(req, res) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// remove a task from the database
async function remove(req, res) {
  try {
    const task = await taskService.removeTask(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// update a task in the database
async function update(req, res) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  get,
  gets,
  create,
  update,
  remove,
};
