const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be a positive number"]
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Entertainment", "Health", "Utilities", "Other"]
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"]
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);

