import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, MenuItem } from "@mui/material";
import { expenseDetails, updateExpense } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const categories = ["Food", "Transport", "Shopping", "Health", "Entertainment", "Other"];

const ExpenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ amount: "", category: "", date: "", description: "" });
  const token = localStorage.getItem("token");

  const updateapicall = async () => {
    const result = await expenseDetails(id, token);
    console.log("result", result);
    setForm(result?.data);
  };

  useEffect(() => {
    updateapicall();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("token----", token);
        console.log("form----", form);
      const result = await updateExpense(id, form, token);
      if (result) {
        navigate("/expenses_list");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5">Update Expense Details</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount (₹)"
          type="number"
          fullWidth
          margin="normal"
          value={form?.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <TextField
          label="Category"
          select
          fullWidth
          margin="normal"
          value={form?.category}
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
          value={form?.date}
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
          value={form?.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Update Expense
        </Button>
      </form>
    </Paper>
  );
};

export default ExpenseUpdate;
