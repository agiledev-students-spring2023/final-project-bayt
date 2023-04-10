const assert = require("assert");
const taskService = require("../../src/services/task.service.js");

// New Task data we add to the database
let existingTaskData = {};
const newTaskData = {
  id: {
    $oid: "test-new-task-id-1",
  },
  task_name: "new task",
  description: "new task description",
  room: "new room",
  assignee: "new assignee",
  due_time: {
    $date: {
      $numberLong: 164717936800,
    },
  },
  complete: false,
  repeat: 1,
};

describe("Task Service", () => {
  // Check if there is data in tasklist.json to sample before anything
  before(async () => {
    const task_json = require("../../src/json/tasklist.json");
    assert(task_json.length > 0, "Task list should have at least one element");
    existingTaskData = task_json[0];
  });

  describe("#getTasks()", () => {
    it("should return an array of tasks", async () => {
      const tasks = await taskService.getTasks();
      assert(Array.isArray(tasks));
    });
  });

  describe("#getTask(task_id)", () => {
    it("should return the task with the matching task_id", async () => {
      const task = await taskService.getTask(existingTaskData.id.$oid);
      assert.strictEqual(task.id.$oid, existingTaskData.id.$oid);
    });

    it("should return undefined if no task with matching task_id is found", async () => {
      const task = await taskService.getTask("nonexistent-task-id");
      assert.strictEqual(task, undefined);
    });
  });

  describe("#createTask(task_data)", () => {
    it("should add the task_data to the task_json array if it does not already exist", async () => {
      const message = await taskService.createTask(newTaskData);
      assert.strictEqual(message, "Task created successfully");
      const task = await taskService.getTask(newTaskData.id.$oid);
      assert.deepStrictEqual(task, newTaskData);
    });

    it('should return "Task already exists" if the task_data already exists in the task_json array', async () => {
      await assert.rejects(
        async () => {
          await taskService.createTask(existingTaskData);
        },
        {
          name: "Error",
          message: "Task already exists",
        }
      );
    });
  });

  describe("#updateTask(task_id, task_data)", () => {
    it("should update the task_data in the task_json array for the task with the matching task_id", async () => {
      const taskDataToUpdate = {
        id: {
          $oid: existingTaskData.id.$oid,
        },
        task_name: "updated task",
        description: "updated task description",
        room: "updated room",
        assignee: "updated assignee",
        due_time: {
          $date: {
            $numberLong: 164717936800,
          },
        },
        complete: false,
        repeat: 2,
      };
      const message = await taskService.updateTask(
        existingTaskData.id.$oid,
        taskDataToUpdate
      );
      assert.strictEqual(message, "Task updated successfully");
      const task = await taskService.getTask(existingTaskData.id.$oid);
      assert.deepStrictEqual(task, taskDataToUpdate);
    });
  });

  describe("#removeTask(task_id)", () => {
    // create task beforehand 
    before(async () => {
      try {
        await taskService.createTask(newTaskData);
      } catch (e) {
        // do nothing
      }
    });

    it("should remove the task with the matching task_id from the task_json array", async () => {
      const message = await taskService.removeTask(newTaskData.id.$oid);
      assert.strictEqual(message, "Task deleted successfully");
      const task = await taskService.getTask(newTaskData.id.$oid);
      assert.strictEqual(task, undefined);
    });
  });
});
