const Event = require('../models/Event');
const Ticket = require('../models/Tickets');
const mongoose = require('mongoose');

exports.getOverviewStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments({ organizer: req.user._id });
    const totalTicketsSold = await Ticket.aggregate([
        {
          $lookup: {
            from: 'events', 
            localField: 'event', 
            foreignField: '_id', 
            as: 'eventDetails'
          }
        },
        { $unwind: '$eventDetails' },
        { $match: { 'eventDetails.organizer': req.user._id } },
        { $group: { _id: null, total: { $sum: "$quantity" } } }
      ]);
      const totalRevenue = await Ticket.aggregate([
        {
          $lookup: {
            from: 'events', 
            localField: 'event', 
            foreignField: '_id', 
            as: 'eventDetails'
          }
        },
        { $unwind: '$eventDetails' },
        { $match: { 'eventDetails.organizer': req.user._id } },
        {
          $group: {
            _id: null,
            revenue: { $sum: { $multiply: ["$price", "$quantity"] } }
          }
        }
      ]);
    return res.status(200).json({ status: 200, message: 'Dashboard Overview Stats', data: { totalEvents, totalTicketsSold: totalTicketsSold[0]?.total || 0, totalRevenue: totalRevenue[0]?.revenue || 0 } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Failed to get overview stats', data: "" });
  }
};

exports.getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).sort({ date: -1 });
    return res.status(200).json({ status: 200, message: 'Organizer Events', data: events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Failed to get events', data: "" });
  }
};

exports.getEventTickets = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const tickets = await Ticket.aggregate([
      { $match: { event: new mongoose.Types.ObjectId(eventId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'purchaser',
          foreignField: '_id',
          as: 'attendee'
        }
      },
      { $unwind: '$attendee' },
      {
        $project: {
          'attendee.password': 0,
          'attendee.__v': 0,
          'attendee.createdOn': 0,
          'attendee.updatedOn': 0
        }
      }
    ]);

    return res.status(200).json({ status: 200, message: 'Event Tickets', data: tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Failed to get event tickets', data: "" });
  }
};
