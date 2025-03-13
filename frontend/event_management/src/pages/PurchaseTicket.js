import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import ticketApi from "../apis/ticketApi";

const PurchaseTicket = ({ eventId }) => {
  const [formData, setFormData] = useState({
    eventId: eventId,
    ticketType: "Free",
    quantity: 1,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchase = async () => {
    try {
      await ticketApi.purchaseTicket(formData);
      setMessage("Ticket purchased successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5">Purchase Ticket</Typography>
      {message && <Typography color="error">{message}</Typography>}
      <TextField
        select
        fullWidth
        label="Ticket Type"
        name="ticketType"
        value={formData.ticketType}
        onChange={handleChange}
        sx={{ mt: 2 }}
      >
        <MenuItem value="Free">Free</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="VIP">VIP</MenuItem>
      </TextField>
      <TextField
        fullWidth
        type="number"
        label="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={handlePurchase}>
        Purchase
      </Button>
    </Container>
  );
};

export default PurchaseTicket;
