import React, { useState } from "react";
import { useAuth } from "../context/auth_context";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";
import { loginApi } from "../api"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await loginApi(formData);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      login({ ...user, token });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>

        <Typography align="center" sx={{ marginTop: 2 }}>
          Don't have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;