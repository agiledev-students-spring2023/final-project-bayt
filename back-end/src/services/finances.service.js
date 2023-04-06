let transaction_json = require('../json/transactions.json');

async function getAllTransactions() {
  return transaction_json;
}

async function addTransaction(transaction) {
  const newTransaction = {
    paidOrRequesting: transaction.paidOrRequesting,
    amount: transaction.amount,
    toOrFrom: transaction.toOrFrom,
    user: transaction.user,
    forWhat: transaction.forWhat,
    date: transaction.date,
  };
  transaction_json.push(newTransaction);
  return newTransaction;
}

module.exports = {
  getAllTransactions,
  addTransaction,
};
