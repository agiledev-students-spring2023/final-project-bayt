const mongoose = require('mongoose');
const Schema = mongoose.Schema

const mongoose = require('mongoose');

const transactionSchema = new Schema({
  paidOrRequesting: {
    type: String,
    required: true,
    enum: ['Paid', 'Requesting']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  toOrFrom: {
    type: String,
    required: true,
    enum: ['to', 'from']
  },
  user: {
    type: String,
    required: true
  },
  forWhat: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;
