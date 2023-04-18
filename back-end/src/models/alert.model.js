const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Alert = mongoose.model("Alert", AlertSchema);

module.exports = Alert;
