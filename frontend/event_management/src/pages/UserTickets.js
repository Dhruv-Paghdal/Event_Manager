import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, CircularProgress } from "@mui/material";
import ticketApi from "../apis/ticketApi";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketApi.getUserTickets();
        setTickets(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>My Tickets</Typography>
      {tickets.length === 0 ? (
        <Typography>No tickets purchased yet.</Typography>
      ) : (
        tickets.map((ticket) => (
          <Paper key={ticket._id} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">{ticket.eventTitle}</Typography>
            <Typography>Type: {ticket.type}</Typography>
            <Typography>Quantity: {ticket.quantity}</Typography>
            <Typography>Date: {new Date(ticket.eventDate).toLocaleDateString()}</Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default UserTickets;
