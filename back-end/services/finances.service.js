let transactions = [];

async function getAllTransactions() {
  return transactions;
}

async function addTransaction() {
    const newTransaction = {
        paidOrRequesting: transaction.paidOrRequesting,
        amount: transaction.amount,
        toOrFrom: transaction.toOrFrom,
        user: transaction.user,
        forWhat: transaction.forWhat,
        date: transaction.date,
      };
      transactions.push(newTransaction);
      return newTransaction;
}

module.exports = {
  getAllTransactions,
  addTransaction,
};
