const taskService = require("../services/task.service.js");

// get task by id taskSer
async function get(req, res) {
  try {
    let task = await taskService.getTask(req.user.houses._id, req.params.id);

    if (process.env.NODE_ENV === 'production') {
      if (task === null) throw new Error("Task not found");
      // Set assignee to the first name of the assignee and only access assignee if its not null
      task.assignee = task.assignee?.username ?? "No Assignee";
      task.room = task.room?.roomName;
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
    let tasks = await taskService.getTasks(req.user.houses._id);
    if (process.env.NODE_ENV === 'production') {
      // Set assignee to the first name of the assignee and only access assignee if its not null
      tasks.forEach((task) => {
        task.assignee = task.assignee?.first_name ?? "No Assignee";
        task.room = task.room?.roomName;
      });
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// create a task and add it to the database
async function create(req, res) {
  try {
    const task = await taskService.createTask(req.user.houses._id, req.body);
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
