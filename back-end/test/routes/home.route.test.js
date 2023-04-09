const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app.js");

chai.use(chaiHttp);

const newRoom = {
    roomName: "Test Room",
    url: "testRoom"
};

describe("Home Routes", () => {
    describe("getRooms", () => {
        it("should return all rooms", (done) => {
            chai
                .request(app)
                .get("/home")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("array")
                    done()
                })
        })
    })
    describe("addRoom", () => {
        it("should add a new room to list", (done) => {
            chai
                .request(app)
                .post("/home")
                .send(newRoom)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.eql(newRoom)
                    done()
                })
        })
    })
})