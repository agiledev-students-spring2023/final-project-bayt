// // SERVICE HARDCODED(AT LEAST TEMPORARILY) TASK DATA
let getTasks, getTask, CreateTask, UpdateTask, RemoveTask;
let task_json = require('../json/tasklist.json')
// load the dataabase models we want to deal with
const Task = require('../models/task.list.model.js');
const User = require('../models/users.model.js');
const Room = require('../models/room.model.js');
const House = require('../models/house.model.js');

//Import the task
if (process.env.NODE_ENV === 'production') {
  getTasks = async () => {
    return Task.find({}).populate('assignee', '-_id first_name').populate('room','-_id roomName').lean();
  };

  getTask = async (task_id) => {
    return Task.findById(task_id).populate('assignee', 'first_name').populate('room','roomName').lean();
  };

  // make sure task doesnt exist in database then add the task to the Task
  createTask = async (task_data) => {
    const task_query = await getTask(task_data._id);
    if (task_query !== null) throw new Error("Task already exists");
    await Task.create(task_data);
    return "Task created successfully";
  };

  // find and update the task MongoDB document based off task_data json object
  updateTask = async (task_id, task_data) => {
    Task.findByIdAndUpdate(task_id, task_data).then((updatedTask) => {
      if (!updatedTask) {
        throw new Error("Error in updating task");
      }
      return "Task updated successfully";
    }).catch(() => {
      throw new Error("DB Error in updating task");
    });
  };

  // find and remove the task MongoDB document based off task_id
  removeTask = async (task_id) => {
    Task.findByIdAndDelete(task_id).then((deletedTask) => {
      if (!deletedTask) {
        throw new Error("Error in deleting task");
      }
      return "Task deleted successfully";
    }).catch(() => {
      throw new Error("DB Error in deleting task");
    });
  };
} else {
  getTasks = async () => {
    return task_json;
  };

  getTask = async (task_id) => {
    return task_json.find((task) => task._id === task_id);
  };

  // add task data to task data json array if it does not exist
  createTask = async (task_data) => {
    const task = await getTask(task_data._id);
    if (task !== undefined) throw new Error("Task already exists");
    task_json.push(task_data);
    return "Task created successfully";
  };

  // find and update the task data array based off task_data json object
  updateTask = async (task_id, task_data) => {
    const indexToUpdate = task_json.findIndex((task) => task._id === task_id);
    if (indexToUpdate === -1) throw new Error("Error in updating task");
    task_json[indexToUpdate] = task_data;
    return "Task updated successfully";
  };

  removeTask = async (task_id) => {
    const indexToRemove = task_json.findIndex((task) => task._id === task_id);
    if (indexToRemove === -1) throw new Error("Error in deleting task");
    task_json.splice(indexToRemove, 1);
    return "Task deleted successfully";
  };
}


module.exports = {
  getTask,
  getTasks,
  createTask,
  updateTask,
  removeTask,
  task_json,
};