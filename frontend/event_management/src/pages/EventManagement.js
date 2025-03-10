import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box, Grid, Paper, CircularProgress } from "@mui/material";
import eventApi from "../apis/eventApi";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "Workshop",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventApi.getEvents();
      setEvents(response.data.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      await eventApi.createEvent(formData);
      fetchEvents(); 
      alert("Event Created Successfully");
    } catch (error) {
      console.error("Event creation failed:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await eventApi.deleteEvent(eventId);
      fetchEvents(); 
    } catch (error) {
      console.error("Event deletion failed:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Manage Events</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Create New Event</Typography>
        <TextField label="Title" fullWidth sx={{ my: 1 }} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextField label="Description" fullWidth sx={{ my: 1 }} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <TextField label="Location" fullWidth sx={{ my: 1 }} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
        <TextField type="date" fullWidth sx={{ my: 1 }} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
        <TextField type="time" fullWidth sx={{ my: 1 }} value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
        <Button variant="contained" onClick={handleCreateEvent}>Create Event</Button>
      </Box>

      <Typography variant="h6">Existing Events</Typography>
      {loading ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} key={event._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{event.title}</Typography>
                <Typography>{event.description}</Typography>
                <Button color="error" onClick={() => handleDelete(event._id)}>Delete</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventManagement;
