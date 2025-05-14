import React, { useState } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import api from "../api/fetchApi";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { setAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/login", { name, email });
      setAuthenticated(true);
    } catch {
      setError("Login failed. Please check your info.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>Login to Fetch Dogs</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required type="email" sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </form>
    </Paper>
  );
} 