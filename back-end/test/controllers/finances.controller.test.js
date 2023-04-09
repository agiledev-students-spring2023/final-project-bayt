const request = require("supertest");
const app = require("../../src/app");
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

describe("Finances Route", () => {
  before((done) => {
    const transactions = [
      {
        paidOrRequesting: "Paid",
        amount: 68,
        toOrFrom: "from",
        user: "nunc",
        forWhat: "ut suscipit",
        date: "6/3/2022",
      },
    ];
    const data = JSON.stringify(transactions);
    fs.writeFile(
      path.join(__dirname, "../../src/json/transactions.json"),
      data,
      (err) => {
        if (err) {
          throw err;
        }
        done();
      }
    );
  });

  after((done) => {
    fs.writeFile(
      path.join(__dirname, "../../src/json/transactions.json"),
      "[]",
      (err) => {
        if (err) {
          throw err;
        }
        done();
      }
    );
  });

  describe("GET /", () => {
    it("should get all transactions", async () => {
      const res = await request(app).get("/finances");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal([
        {
          paidOrRequesting: "Paid",
          amount: 68,
          toOrFrom: "from",
          user: "nunc",
          forWhat: "ut suscipit",
          date: "6/3/2022",
        },
      ]);
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
      const res = await request(app)
        .post("/finances")
        .send(newTransaction)
        .set("Content-Type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({
        paidOrRequesting: "Paid",
        amount: 100,
        toOrFrom: "to",
        user: "test",
        forWhat: "test",
        date: "4/9/2023",
      });
    });
  });
});

