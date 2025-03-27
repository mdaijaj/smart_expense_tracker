import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, MenuItem } from "@mui/material";
import { addExpense } from "../api";

const categories = ["Food", "Transport", "Shopping", "Health", "Entertainment", "Other"];

const AddExpense = ({ onSubmit, editExpense, userId }) => {
  const [form, setForm] = useState(
    editExpense || { amount: "", category: "", date: "", description: "" }
  );
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (editExpense) {
      setForm(editExpense); 
    }
  }, [editExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({ ...form, userId }, `${token}`); 
      setForm({ amount: "", category: "", date: "", description: "" }); 
      if (onSubmit) onSubmit(); 
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5">{editExpense ? "Edit Expense" : "Add Expense"}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount (₹)"
          type="number"
          fullWidth
          margin="normal"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <TextField
          label="Category"
          select
          fullWidth
          margin="normal"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Description"
          multiline
          rows={2}
          fullWidth
          margin="normal"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editExpense ? "Update Expense" : "Add Expense"}
        </Button>
      </form>
    </Paper>
  );
};

export default AddExpense;