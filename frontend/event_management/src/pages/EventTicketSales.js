import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import ticketApi from "../apis/ticketApi";

const EventTicketSales = ({ eventId }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketApi.getEventTickets(eventId);
        setTickets(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [eventId]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Event Ticket Sales</Typography>
      {tickets.length === 0 ? (
        <Typography>No tickets sold yet.</Typography>
      ) : (
        tickets.map((ticket) => (
          <Paper key={ticket._id} sx={{ p: 2, mt: 2 }}>
            <Typography>Purchaser: {ticket.purchaserName}</Typography>
            <Typography>Email: {ticket.purchaserEmail}</Typography>
            <Typography>Type: {ticket.type}</Typography>
            <Typography>Quantity: {ticket.quantity}</Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default EventTicketSales;
