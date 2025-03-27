import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getExpenses, deleteExpense, profileDetails } from "../api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ExpenseList = () => {
    const navigate = useNavigate();
  
  const [budgets, setBudgets] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(0); 
  const [newBudget, setNewBudget] = useState(""); 
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    fetchExpenses();
    fetchProfileData(); 
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [selectedMonth, selectedYear, budgets]);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses(token);
      console.log("response", response);
      const expenses = response.data; 
      setBudgets(expenses);
      calculateMonthlyData(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const profile=await profileDetails(token);
      setMonthlyBudget(profile.monthlyBudget || 0); 
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const onEdit = (id) => {
    navigate(`/edit_expense/${id}`);
  }

  const calculateMonthlyData = (expenses) => {
    const groupedByMonth = expenses.reduce((acc, expense) => {
      const month = dayjs(expense.date).format("YYYY-MM"); 
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += expense.amount; 
      return acc;
    }, {});

    const monthlyArray = Object.entries(groupedByMonth).map(([month, total]) => ({
      month,
      total,
    }));
    setMonthlyData(monthlyArray);
  };

  const filterExpenses = () => {
    if (!selectedMonth && !selectedYear) {
      setFilteredBudgets(budgets);
      return;
    }

    const filtered = budgets.filter((expense) => {
      const expenseDate = dayjs(expense.date);
      const matchesMonth = selectedMonth ? expenseDate.format("MM") === selectedMonth : true;
      const matchesYear = selectedYear ? expenseDate.format("YYYY") === selectedYear : true;
      return matchesMonth && matchesYear;
    });

    setFilteredBudgets(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, `${token}`);
      const updatedBudgets = budgets.filter((budget) => budget._id !== id);
      setBudgets(updatedBudgets); 
      calculateMonthlyData(updatedBudgets); 
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleBudgetUpdate = () => {
    const updatedBudget = parseFloat(newBudget);
    if (!isNaN(updatedBudget) && updatedBudget > 0) {
      setMonthlyBudget(updatedBudget);
      setNewBudget(""); 
    }
  };

  // Calculate total amount
  const totalFilteredAmount = filteredBudgets.reduce((sum, budget) => sum + budget.amount, 0);

  // Calculate total expenses for the selected month
  const totalMonthlyExpenses = filteredBudgets.reduce((sum, budget) => {
    const expenseDate = dayjs(budget.date);
    const matchesMonth = selectedMonth ? expenseDate.format("MM") === selectedMonth : true;
    const matchesYear = selectedYear ? expenseDate.format("YYYY") === selectedYear : true;
    return matchesMonth && matchesYear ? sum + budget.amount : sum;
  }, 0);

  // if total expenses exceed 80% of the monthly budget
  const isExceedingBudget = totalMonthlyExpenses > 0.8 * monthlyBudget;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Your Expenses List</Typography>

      {/* Filter Section */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          label="Month"
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {dayjs().month(i).format("MMMM")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          label="Year"
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 5 }, (_, i) => {
            const year = dayjs().year() - i;
            return (
              <MenuItem key={year} value={String(year)}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* Monthly Budget Section */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Monthly Budget: ₹{monthlyBudget}
      </Typography>
      <TextField
        label="Update Budget"
        variant="outlined"
        size="small"
        value={newBudget}
        onChange={(e) => setNewBudget(e.target.value)}
        sx={{ mt: 2, mr: 1 }}
      />
      <Button variant="contained" onClick={handleBudgetUpdate} sx={{ mt: 2 }}>
        Update
      </Button>
      {isExceedingBudget && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Warning: You have exceeded 80% of your monthly budget!
        </Alert>
      )}

      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Total Amount: ₹{totalFilteredAmount}
      </Typography>

      {/* Expenses List */}
      <TableContainer sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount (₹)</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBudgets?.map((budget) => (
              <TableRow key={budget._id}>
                <TableCell>₹{budget.amount}</TableCell>
                <TableCell>{budget.category}</TableCell>
                <TableCell>{budget.date}</TableCell>
                <TableCell>{budget.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(budget._id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(budget._id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExpenseList;