const { expect } = require("chai");
const sinon = require("sinon");
const alertsService = require("../../src/services/alerts.service");
const alertsController = require("../../src/controllers/alerts.controller");

describe("Alerts Controller", () => {
  describe("getAlerts", () => {
    it("should return an array of alerts for a user", async () => {
      const req = {};
      const res = {
        json: sinon.spy()
      };
      const alerts = [
        { task: "Task 1", date: "04/10/2023", id: "123" },
        { task: "Task 2", date: "04/11/2023", id: "456" }
      ];
      sinon.stub(alertsService, "getAlerts").returns(alerts);

      await alertsController.getAlerts(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(alerts);

      alertsService.getAlerts.restore();
    });

    it("should handle errors by calling the error handling middleware", async () => {
      const req = {};
      const res = {};
      const next = sinon.spy();
      const error = new Error("Something went wrong.");
      sinon.stub(alertsService, "getAlerts").rejects(error);

      await alertsController.getAlerts(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0]).to.equal(error);

      alertsService.getAlerts.restore();
    });
  });

  describe("updateAlertState", () => {
    it("should update the complete state of an alert and return a success message", async () => {
      const req = {
        body: {
          alertId: "123",
          isChecked: true
        }
      };
      const res = {
        json: sinon.spy()
      };
      sinon.stub(alertsService, "logAlertState");

      await alertsController.updateAlertState(req, res);

      expect(alertsService.logAlertState.calledOnceWith(req.body.alertId, req.body.isChecked)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({ success: true });

      alertsService.logAlertState.restore();
    });

    it("should handle errors by calling the error handling middleware", async () => {
      const req = {
        body: {
          alertId: "123",
          isChecked: true
        }
      };
      const res = {};
      const next = sinon.spy();
      const error = new Error("Something went wrong.");
      sinon.stub(alertsService, "logAlertState").rejects(error);

      await alertsController.updateAlertState(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0]).to.equal(error);

      alertsService.logAlertState.restore();
    });
  });
});
