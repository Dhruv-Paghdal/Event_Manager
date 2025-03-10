import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Container, Grid } from '@mui/material';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`/api/event/details/${eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEvent(res.data.data.event);
        setTickets(res.data.data.ticketAvailability);
      } catch (error) {
        console.error('Failed to fetch event details', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>{event.title}</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">About the Event:</Typography>
          <Typography>{event.description}</Typography>
          <Typography><strong>Date:</strong> {new Date(event.date).toDateString()}</Typography>
          <Typography><strong>Location:</strong> {event.location}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>Tickets:</Typography>
      <Grid container spacing={2}>
        {tickets.map(ticket => (
          <Grid item xs={12} sm={6} key={ticket._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{ticket.type}</Typography>
                <Typography><strong>Price:</strong> ${ticket.price}</Typography>
                <Typography><strong>Available:</strong> {ticket.available}</Typography>
                <Typography><strong>Sold:</strong> {ticket.sold || 0}</Typography>
                <Button variant="contained" color="primary" disabled={ticket.available === 0}>
                  Register
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventDetails;
