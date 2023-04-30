const financesService = require("../services/finances.service.js");

async function getAllTransactions(req, res) {
  try {
    const transactions = await financesService.getAllTransactions(req.user.houses._id);
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: "failed to retrieve data",
    });
  }
}

async function addTransaction(req, res) {
  const transaction = req.body;
  const newTransaction = await financesService.addTransaction(transaction, req.user.houses._id);
  res.status(200).json(newTransaction);
}

module.exports = {
  getAllTransactions,
  addTransaction,
};
