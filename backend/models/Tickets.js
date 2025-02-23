const mongoose = require('mongoose');

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'tickets'
}

const TicketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    unique: true,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  }
}, options);

module.exports = mongoose.model('Ticket', TicketSchema);