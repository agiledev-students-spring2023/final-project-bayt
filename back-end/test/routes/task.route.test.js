const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../../src/app.js");

const encodings = require('../../node_modules/iconv-lite/encodings');                                                                                                                                                                       
const iconvLite = require('../../node_modules/iconv-lite/lib');                                                                                                                                                                             
iconvLite.getCodec('UTF-8');

chai.use(chaiHttp);

let task_id = 0;
const inv_task_id = -123132132; // Invalid task ID

// New task data we add to the database
const newTaskData = {
  _id: "test-new-task-iddddddd",
  task_name: "new task",
  description: "new task description",
  room: "new room",
  assignee: "new assignee",
  due_time: 164717936800,
  complete: false,
  repeat: 1,
};

describe("Task Routes", () => {
  // Check if there is data in tasklist.json to sample before anything
  before(async () => {
    const task_json = require("../../src/json/tasklist.json");
    task_json.should.be.a("array").has.length.greaterThan(0);
    task_id = task_json[0]._id;
  });
    
  // Check if the get function works and if create actually created the task
  describe("GET REQ", () => {
    it("should return the task ", (done) => {
      chai
        .request(app)
        .get(`/tasks/${task_id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("_id")
            .eql(task_id);
          done();
        });
    });

    it("should return an error when an invalid task ID is provided", (done) => {
      chai
        .request(app)
        .get(`/tasks/${inv_task_id}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          done();
        });
    });
  });

  describe("GET REQ ALL TASKS", () => {
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
  describe("POST TASK", () => {
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
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("errors");
            done();
          });
      });
    });

    describe("PUT TASK", () => {
      it("should update an existing task", (done) => {
        chai
          .request(app)
          .put(`/tasks/${newTaskData._id}`)
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
