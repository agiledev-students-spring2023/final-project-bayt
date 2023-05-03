const { expect } = require("chai");
const sinon = require("sinon");
const express = require("express");
const request = require("supertest");
const fs = require("fs");
const path = require("path");
const financesRoute = require("../../src/routes/finances.route");
const financesController = require("../../src/controllers/finances.controller");
const financesService = require("../../src/services/finances.service");

const app = express();
app.use(express.json());
app.use("/", financesRoute);

describe("Finances Route", () => {
  before(() => {
    const transactionsData = JSON.stringify([
      {
        paidOrRequesting: "Paid",
        amount: 68,
        toOrFrom: "from",
        user: "nunc",
        forWhat: "ut suscipit",
        date: "6/3/2022",
      },
      // ...
    ]);

    const filePath = path.join(__dirname, "../transactions.json");
    sinon.stub(fs, "readFileSync").returns(transactionsData);
  });

  after(() => {
    fs.readFileSync.restore();
  });

  describe("GET /", () => {
    it("should return a list of all transactions", async () => {
      const res = await request(app).get("/");
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(10);
    });
  });

  describe("POST /", () => {
    it("should add a new transaction and return the added transaction", async () => {
      const newTransaction = {
        paidOrRequesting: "Paid",
        amount: 100,
        toOrFrom: "to",
        user: "test",
        forWhat: "test",
        date: "4/9/2023",
      };
      sinon.stub(financesService, "addTransaction").resolves(newTransaction);

      const res = await request(app).post("/").send(newTransaction);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(newTransaction);

      financesService.addTransaction.restore();
    });
  });
});
