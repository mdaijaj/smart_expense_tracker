import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  LinearProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const COLORS = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#A28EFF", // Purple
  "#FF6F91", // Pink
  "#85E3FF", // Light Blue
  "#B9FBC0", // Light Green
];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");


  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch expenses
      const expensesResponse = await API.get("/expenses", {
        headers: { Authorization: token },
      });
      setExpenses(expensesResponse.data);

      // Fetch budget
      const profileResponse = await API.get("/auth/profile", {
        headers: { Authorization: token },
      });
      setBudget(profileResponse.data?.user?.monthly_budget);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Extract unique months and years from expenses
  const months = [...new Set(expenses.map((e) => new Date(e.date).toLocaleString("default", { month: "long" })))];
  const years = [...new Set(expenses.map((e) => new Date(e.date).getFullYear()))];

  // Filter expenses based on selected month and year
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const matchesMonth = selectedMonth
      ? expenseDate.toLocaleString("default", { month: "long" }) === selectedMonth
      : true;
    const matchesYear = selectedYear
      ? expenseDate.getFullYear().toString() === selectedYear
      : true;
    return matchesMonth && matchesYear;
  });

  const totalExpenses = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const expenseData = filteredExpenses.map((e) => ({ name: e.category, value: e.amount }));
  const budgetUsage = budget ? (totalExpenses / budget) * 100 : 0;

  // Prepare data for the Line Chart
  const monthlyTrends = filteredExpenses.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString("default", { month: "short" });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ month, amount: curr.amount });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Summary Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Reports & Analytics Summary
        </Typography>
        <Typography variant="h6">Total Expenses: ₹{totalExpenses}</Typography>
        <Typography variant="h6">Budget: ₹{budget}</Typography>
        <LinearProgress
          variant="determinate"
          value={budgetUsage}
          sx={{ height: 10, borderRadius: 5, mt: 1, backgroundColor: "#eee" }}
        />
        <Typography
          variant="body1"
          color={budgetUsage > 80 ? "error" : "textSecondary"}
        >
          {budgetUsage.toFixed(2)}% of your budget used
        </Typography>
      </Paper>


      {/* Pie Chart and Expense Table */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* Pie Chart */}
        <Paper elevation={3} sx={{ flex: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6">Spending by Category</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Expense Table */}
        <Paper elevation={3} sx={{ flex: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6">Recent Expenses</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Category</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Amount</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell align="right">₹{expense.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      
      {/* Line Chart for Monthly Trends */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Monthly Spending Trends</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;