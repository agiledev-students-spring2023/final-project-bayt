const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Alerts route", () => {
  it("should return all alerts", (done) => {
    chai
      .request(app)
      .get("/alerts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should update an alert state", (done) => {
    chai
      .request(app)
      .post("/alerts/update")
      .send({ alertId: "123", isChecked: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ success: true });
        done();
      });
  });
});
