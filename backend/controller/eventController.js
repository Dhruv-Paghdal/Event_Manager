const Event = require('../models/Event');
const mongoose = require('mongoose');

exports.createEvent = async (req, res) => {
  const { title, description, location, date, time, category, ticketDetails } = req.body;
  try {
    const payload = {
        title, 
        description, 
        location, 
        date: new Date(date), 
        time, 
        category, 
        ticketDetails: {
          type: ticketDetails.type,
          price: parseInt(ticketDetails.price),
          availability: parseInt(ticketDetails.availability)
        }, 
        organizer: req.user.id
    }
    const newEvent = await Event.create(payload);
    if(!newEvent) {
        return res.status(400).json({status:400, message: "Error while creating new event", data: ""}) 
    }
    return res.status(201).json({ status: 201, message: "Event created successfully", data: newEvent});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Event creation failed", data: "" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const pipeLine = [
      {
        $lookup: {
          from: 'users',
          localField: 'organizer',
          foreignField: '_id',
          as: 'organizerDetails'
        }
      },
      {
        $unwind: '$organizerDetails'
      },
      {
        $project: {
          title: 1,
          description: 1,
          location: 1,
          date: 1,
          time: 1,
          category: 1,
          ticketDetails: 1,
          organizerId: '$organizerDetails._id',
          organizerName: '$organizerDetails.name',
          organizerEmail: '$organizerDetails.email'
        }
      }
    ];
    const events = await Event.aggregate(pipeLine);
    return res.status(200).json({ status: 200, message: "Events fetched successfully", data: events });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Failed to fetch events", data: "" });
  }
};

exports.getEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const pipeLine = [
      { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'organizer',
          foreignField: '_id',
          as: 'organizerDetails'
        }
      },
      {
        $unwind: '$organizerDetails'
      },
      {
        $project: {
          title: 1,
          description: 1,
          location: 1,
          date: 1,
          time: 1,
          category: 1,
          ticketDetails: 1,
          organizerId: '$organizerDetails._id',
          organizerName: '$organizerDetails.name',
          organizerEmail: '$organizerDetails.email'
        }
      }
    ];
    const event = await Event.aggregate(pipeLine);
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found", data: "" });
    }
    return res.status(200).json({ status: 200, message: "Event fetched successfully", data: event[0] });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ status: 500, message: "Failed to fetch event", data: "" });
  }
};

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found", data: "" });
    }
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ status: 403, message: "Unauthorized to edit event", data: "" });
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    return res.status(200).json({ status: 200, message: "Event updated successfully", data: updatedEvent });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Failed to update event", data: "" });
  }
};

exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ status: 404, message: "Event not found", data: "" });
    }
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ status: 403, message: "Unauthorized", data: "" });
    }
    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ status: 200, message: "Event deleted successfully", data: "" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Failed to delete event", data: "" });
  }
};