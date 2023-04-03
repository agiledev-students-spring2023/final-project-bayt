const assert = require('assert');
const taskService = require('../../services/task.service.js');

describe('Task Service', () => {
  describe('#getTasks()', () => {
    it('should return an array of tasks', async () => {
      const tasks = await taskService.getTasks();
      assert(Array.isArray(tasks));
    });
  });

  describe('#getTask(task_id)', () => {
    it('should return the task with the matching task_id', async () => {
      const task = await taskService.getTask("64055f38f032391df0001d6a");
      assert.strictEqual(task.id.$oid, "64055f38f032391df0001d6a");
    });

    it('should return undefined if no task with matching task_id is found', async () => {
      const task = await taskService.getTask("nonexistent-task-id");
      assert.strictEqual(task, undefined);
    });
  });

  describe('#createTask(task_data)', () => {
    it('should add the task_data to the task_json array if it does not already exist', async () => {
      const newTaskData = {
        id: {
          $oid: "test-new-task-id"
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
      const message = await taskService.createTask(newTaskData);
      assert.strictEqual(message, "Task created successfully");
      const task = await taskService.getTask("test-new-task-id");
      assert.deepStrictEqual(task, newTaskData);
    });

    it('should return "Task already exists" if the task_data already exists in the task_json array', async () => {
      const existingTaskData = {
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
      };
      const message = await taskService.createTask(existingTaskData);
      assert.strictEqual(message, "Task already exists");
    });
  });

  describe('#updateTask(task_id, task_data)', () => {
    it('should update the task_data in the task_json array for the task with the matching task_id', async () => {
      const taskDataToUpdate = {
        id: {
          $oid: "64055f38f032391df0001d6a",
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
      const message = await taskService.updateTask("64055f38f032391df0001d6a", taskDataToUpdate);
      assert.strictEqual(message, "Task updated successfully");
      const task = await taskService.getTask("64055f38f032391df0001d6a");
      assert.deepStrictEqual(task, taskDataToUpdate);
    });
  })

  describe('#removeTask(task_id)', () => {
    it('should remove the task with the matching task_id from the task_json array', async () => {
      const message = await taskService.removeTask("test-new-task-id");
      assert.strictEqual(message, "Task deleted successfully");
      const task = await taskService.getTask("test-new-task-id");
      assert.strictEqual(task, undefined);
    });
  });

});
