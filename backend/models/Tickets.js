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
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    enum: ['Free', 'Paid', 'VIP'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true
  }
}, options);

module.exports = mongoose.model('Ticket', TicketSchema);