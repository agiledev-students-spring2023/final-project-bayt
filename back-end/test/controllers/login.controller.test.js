// const { expect } = require("chai");
// const sinon = require("sinon");
// const loginService = require("../../src/services/login.service.js");
// const loginController = require("../../src/controllers/login.controller.js");

// describe("Login Controller", () => {
//   describe("#login(req, res)", () => {
//     it("should return a json of success message if username and password are correct", async () => {
//       const req = {username: 'fishc0', password: '12345'};
//       const res = {
//         json: sinon.spy()
//       };
//       const alerts = "Login successfully";
//       sinon.stub(loginService, "getUser").returns(alerts);

//       await loginController.login(req, res);

//       expect(res.json.calledOnce).to.be.true;
//       expect(res.json.firstCall.args[0]).to.deep.equal(alerts);

//       loginService.getUser.restore();
//     });

//     // it("should handle errors by calling the error handling middleware", async () => {
//     //   const req = {};
//     //   const res = {};
//     //   const next = sinon.spy();
//     //   const error = new Error("Something went wrong.");
//     //   sinon.stub(alertsService, "getAlerts").rejects(error);

//     //   await alertsController.getAlerts(req, res, next);

//     //   expect(next.calledOnce).to.be.true;
//     //   expect(next.firstCall.args[0]).to.equal(error);

//     //   alertsService.getAlerts.restore();
//     // });
//   });
// });
