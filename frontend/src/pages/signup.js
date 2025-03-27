import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";
import { signup } from "../api"; 

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let result= await signup(formData);
      console.log("result", result)
      navigate("/login"); 
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

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
            Sign Up
          </Button>
        </Box>

        <Typography align="center" sx={{ marginTop: 2 }}>
          Already have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
