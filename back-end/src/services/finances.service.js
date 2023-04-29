let transaction_json = require("../json/transactions.json");
const Transaction = require("../models/transaction.model.js");
const House = require("../models/house.model.js");

async function getAllTransactions(house_id) {
  return Transaction.find({ house: house_id }).populate("house").lean().exec();
}

async function addTransaction(transaction, house_id) {
  const newTransaction = {
    paidOrRequesting: transaction.paidOrRequesting,
    amount: transaction.amount,
    toOrFrom: transaction.toOrFrom,
    user: transaction.user,
    forWhat: transaction.forWhat,
    date: transaction.date,
    house: house_id,
  };
  const updatedHouse = await House.findByIdAndUpdate(
    house_id,
    { $push: { finances: newTransaction._id } },
    { new: true }
  );
  return newTransaction;
}

module.exports = {
  getAllTransactions,
  addTransaction,
};
