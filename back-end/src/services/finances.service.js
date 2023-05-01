let transaction_json = require("../json/transactions.json");
const Transaction = require("../models/transaction.model.js");
const House = require("../models/house.model.js");

async function getAllTransactions(house_id) {
  // return transaction_json;
  const transactions = await Transaction.find({ house: house_id }).lean();
  return transactions;
}

async function addTransaction(transaction, house_id) {
  const newTransaction = {
    paidOrRequesting: transaction.paidOrRequesting,
    amount: transaction.amount,
    toOrFrom: transaction.toOrFrom,
    user: transaction.user,
    forWhat: transaction.forWhat,
    date: transaction.date,
  };
  newTransaction.house = house_id;
  // transaction_json.push(newTransaction);
  Transaction.create(newTransaction);
}

module.exports = {
  getAllTransactions,
  addTransaction,
};
