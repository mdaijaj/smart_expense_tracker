import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth_context";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { CssBaseline, Container } from "@mui/material";
import Navbar from "./pages/navbar";
import AddExpense from "./pages/addExpense";
import ExpenseList from "./pages/expensesList";
import Profile from "./pages/profile";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App=() => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
      <Navbar/>
        <Container maxWidth="md">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/add_expenses" element={<AddExpense />} />
            <Route path="/expenses_list" element={<ExpenseList />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;