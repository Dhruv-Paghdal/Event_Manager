const Ticket = require('../models/Tickets');
const Event = require('../models/Event');

exports.purchaseTicket = async (req, res) => {
  const { eventId, ticketType, quantity } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ status: 404, message: 'Event not found', data: "" });
    }

    const existingRegistration = await Ticket.findOne({ event: eventId, purchaser: req.user._id });
    if (existingRegistration) {
      return res.status(400).json({ status: 400, message: 'User already registered for this event', data: "" });
    }

    const ticket = event.ticketDetails.find(t => t.type === ticketType);
    if (!ticket || ticket.availability < parseInt(quantity)) {
      return res.status(400).json({ status: 400, message: 'Not enough tickets available', data: "" });
    }

    ticket.availability -= parseInt(quantity);
    await event.save();
    const ticketPayload = {
      event: eventId,
      purchaser: req.user._id,
      type: ticketType,
      price: parseInt(ticket.price) || 0,
      quantity:parseInt(quantity)
    }
    const newTicket = await Ticket.create(ticketPayload);
    return res.status(201).json({ status: 201, message: 'Tickets purchased successfully', data: newTicket });
  } catch (error) {  
    return res.status(500).json({ status: 500, message: 'Ticket purchase failed', data: "" });
  }
};

exports.getTicketsByEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ status: 404, message: 'Event not found', data: "" });
      }
      if (event.organizer.toString() !== req.user._id) {
        return res.status(403).json({ status: 403, message: 'Unauthorized', data: "" });
      }
  
      const tickets = await Ticket.aggregate([
        { $match: { event: event._id } },
        {
          $lookup: {
            from: 'users',
            localField: 'purchaser',
            foreignField: '_id',
            as: 'purchaserDetails'
          }
        },
        {
          $unwind: '$purchaserDetails'
        },
        {
          $project: {
            type: 1,
            quantity: 1,
            purchaser: '$purchaserDetails._id',
            purchaserName: '$purchaserDetails.name',
            purchaserEmail: '$purchaserDetails.email'
          }
        }
      ]);
  
      return res.status(200).json({ status: 200, message: 'Tickets fetched successfully', data: tickets });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Failed to fetch tickets', data: "" });
    }
};
  

exports.getUserTickets = async (req, res) => {
    try {
      const tickets = await Ticket.aggregate([
        { $match: { purchaser: req.user._id } },
        {
          $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'eventDetails'
          }
        },
        {
          $unwind: '$eventDetails'
        },
        {
          $project: {
            type: 1,
            quantity: 1,
            eventId: '$eventDetails._id',
            eventTitle: '$eventDetails.title',
            eventDate: '$eventDetails.date'
          }
        }
      ]);
  
      return res.status(200).json({ status: 200, message: 'User tickets fetched successfully', data: tickets});
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Failed to fetch tickets', data: "" });
    }
};
