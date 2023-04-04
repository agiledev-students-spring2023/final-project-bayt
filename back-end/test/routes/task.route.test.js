const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../../src/app.js");

chai.use(chaiHttp);
const task_id = "64055f38f032391df0001d6a"; // Task id we are sure exists in the database
const inv_task_id = -123132132; // Invalid task ID

// New task data we add to the database
const newTaskData = {
  id: {
    $oid: "test-new-task-idddd",
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

describe("Task Controller", () => {

  // Check if the get function works and if create actually created the task
  describe("get()", () => {
    it("should return the task ", (done) => {
      chai
        .request(app)
        .get(`/tasks/${task_id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("id")
            .have.property("$oid")
            .eql(task_id);
          done();
        });
    });

    it("should return an error when an invalid task ID is provided", (done) => {
      chai
        .request(app)
        .get(`/tasks/${inv_task_id}`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Task not found");
          done();
        });
    });
  });

  describe("gets()", () => {
    it("should return a list of tasks", (done) => {
      chai
        .request(app)
        .get("/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("create()", () => {
    it("should create a new task", (done) => {
      chai
        .request(app)
        .post("/tasks")
        .send(newTaskData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql("Task created successfully");
          done();
        });
    });

    it("should return already exists if trying to feed an existing task", (done) => {
      chai
        .request(app)
        .post("/tasks")
        .send(newTaskData)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property("message").eql("Task already exists");
          done();
        });
    });

    it("should return an error when required fields are missing", (done) => {
      const task = {
        // title and description fields are missing
      };
      chai
        .request(app)
        .post("/tasks")
        .send(task)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Task id not found");
          done();
        });
    });
  });

  describe("update()", () => {
    it("should update an existing task", (done) => {
      chai
        .request(app)
        .put(`/tasks/${newTaskData.id.$oid}`)
        .send(newTaskData)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should return an error when trying to update a non-existent task", (done) => {
      chai
        .request(app)
        .put(`/tasks/${inv_task_id}`)
        .send(newTaskData)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
