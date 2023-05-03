const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../../src/app.js");

const encodings = require('../../node_modules/iconv-lite/encodings');                                                                                                                                                                       
const iconvLite = require('../../node_modules/iconv-lite/lib');                                                                                                                                                                             
iconvLite.getCodec('UTF-8');

chai.use(chaiHttp);

const loginSuccess = {
    username: "fishc0",
    password: "12345",
};

const loginWrongPassword = {
    username: "fishc0",
    password: "00000",
};

const loginEmptyHouse = {
    username: "adevuyst0",
    password: "00000",
};

const loginUserNotFound = {
    username: "ppp1",
    password: "00000",
};

describe("Login Routes", () => {

  before(async () => {
    const users_json = require("../../src/json/users.json");
    users_json.should.be.a("array").has.length.greaterThan(0);
  });
    
  describe("POST LOGIN", () => {
    it("should login successfully", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(loginSuccess)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql("Login successfully");
          done();
        });
    });

    it("should return wrong password if password is wrong", (done) => {
    chai
        .request(app)
        .post("/login")
        .send(loginWrongPassword)
        .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eql("Wrong password");
        done();
        });
    });

    it("should return user has not been invited into a house if user houses array is empty", (done) => {
        chai
            .request(app)
            .post("/login")
            .send(loginEmptyHouse)
            .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property("message").eql("User has not been invited into a house");
            done();
            });
    });

    it("should return username not found if username is not found", (done) => {
        chai
            .request(app)
            .post("/login")
            .send(loginUserNotFound)
            .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property("message").eql("Username not found");
            done();
            });
    });
    });
  });
