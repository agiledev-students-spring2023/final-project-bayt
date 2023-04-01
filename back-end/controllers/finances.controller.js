const financesService = require("./finances.service.js");

async function getAllTransactions(req, res) {
  const transactions = financesService.getAllTransactions();
  res.json(transactions);
};

async function addTransaction(req, res) {
    const transaction = req.body;
    const newTransaction = financesService.addTransaction(transaction);
    res.json(newTransaction);
};

module.exports = {
    getAllTransactions,
    addTransaction
  };