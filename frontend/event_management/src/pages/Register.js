import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Attendee",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${baseUrl}/api/users/register`, formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField 
            fullWidth label="Name" margin="normal" name="name"
            value={formData.name} onChange={handleChange}
          />
          <TextField 
            fullWidth label="Email" margin="normal" name="email"
            value={formData.email} onChange={handleChange}
          />
          <TextField 
            fullWidth label="Password" type="password" margin="normal" name="password"
            value={formData.password} onChange={handleChange}
          />
          <TextField
            fullWidth select label="Role" margin="normal" name="role"
            value={formData.role} onChange={handleChange}
          >
            <MenuItem value="Attendee">Attendee</MenuItem>
            <MenuItem value="Organizer">Organizer</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
