const { expect } = require("chai");
const { getAlerts, logAlertState } = require("../../src/services/alerts.service");

describe("Alerts Service", () => {
  describe("getAlerts", () => {
    it("should return an array of alerts for a user", async () => {
      const alerts = await getAlerts();
      expect(alerts).to.be.an("array");
      expect(alerts.length).to.be.greaterThan(0);
      expect(alerts[0]).to.have.property("task");
      expect(alerts[0]).to.have.property("date");
      expect(alerts[0]).to.have.property("_id");
    });
  });

  describe("logAlertState", () => {
    it("should update the complete state of an alert", () => {
      const alertId = { $oid: "642e3662fc13ae490678cb3a" };
      logAlertState(alertId, true);

      const alerts = require("../../src/json/tasklist.json");
      const updatedAlert = alerts.find((alert) => alert._id.$oid === alertId.$oid);
      expect(updatedAlert).to.have.property("complete");
      expect(updatedAlert.complete).to.be.true;
    });
  });
});
