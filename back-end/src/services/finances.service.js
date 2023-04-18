let transaction_json = require('../json/transactions.json');
const Transaction = require("../models/transaction.model.js");

// async function getAllTransactions() {
//   return transaction_json;
// }

async function getAllTransactions() {
  const transactions = await Transaction.find();
  return transactions;
}

async function addTransaction(transaction) {
  const newTransaction = new Transaction({
    paidOrRequesting: transaction.paidOrRequesting,
    amount: transaction.amount,
    toOrFrom: transaction.toOrFrom,
    user: transaction.user,
    forWhat: transaction.forWhat,
    date: transaction.date,
  });
  // transaction_json.push(newTransaction);
  await newTransaction.save();
  return newTransaction;
}

module.exports = {
  getAllTransactions,
  addTransaction,
};
