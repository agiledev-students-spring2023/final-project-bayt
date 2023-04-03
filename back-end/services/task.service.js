// SERVICE HARDCODED(AT LEAST TEMPORARILY) TASK DATA

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

let task_json = [
  {
    id: {
      $oid: "64055f38f032391df0001d6a",
    },
    task_name: "cook spaghetti",
    description: "wake up dog",
    room: "Kiana",
    assignee: "Evania",
    due_time: {
      $date: {
        $numberLong: 164717936800,
      },
    },
    complete: true,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6b",
    },
    task_name: "cook spaghetti",
    description: "wipe the bed",
    room: "Melinda",
    assignee: "Harrison",
    due_time: {
      $date: {
        $numberLong: 164715103700,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6c",
    },
    task_name: "wipe floor in kitchen",
    description: "wake up dog",
    room: "Toluca",
    assignee: "Theo",
    due_time: {
      $date: {
        $numberLong: 164705693900,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6d",
    },
    task_name: "take out trash",
    description: "take dog on walk",
    room: null,
    assignee: "Rolland",
    due_time: {
      $date: {
        $numberLong: 164652765300,
      },
    },
    complete: true,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6e",
    },
    task_name: "take out trash",
    description: "wipe the bed",
    room: null,
    assignee: "Twila",
    due_time: {
      $date: {
        $numberLong: 164687283300,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6f",
    },
    task_name: "call maintenance",
    description: "wake up dog",
    room: "Elazığ",
    assignee: "Cicily",
    due_time: {
      $date: {
        $numberLong: 164670839100,
      },
    },
    complete: true,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d70",
    },
    task_name: "wipe floor in kitchen",
    description: "clean properly this time",
    room: "Villamontes",
    assignee: "Osgood",
    due_time: {
      $date: {
        $numberLong: 164655518500,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d71",
    },
    task_name: "call maintenance",
    description: "wake up dog",
    room: "Sorriso",
    assignee: "Garvy",
    due_time: {
      $date: {
        $numberLong: 164715321100,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d72",
    },
    task_name: "clean bathroom",
    description: "wake up dog",
    room: "Taganrog",
    assignee: "Shaine",
    due_time: {
      $date: {
        $numberLong: 164684893500,
      },
    },
    complete: true,
    repeat: 1,
  },
];
