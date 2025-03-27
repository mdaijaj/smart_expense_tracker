const Expense = require("../model/expense_mode");

const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const newExpense = new Expense({ userId: req.userId, amount, category, date, description });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};


const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, description } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, description }, 
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};


const expenseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expense details" });
  }
};


const expenseList = async (req, res) => {
  try {
    console.log("req.userId", req.userId)
    const expenses = await Expense.find({ userId: req.userId });
    console.log("expenses---", expenses);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
  expenseDetails,
  expenseList,
};