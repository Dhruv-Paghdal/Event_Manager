// server/models/Event.js
const mongoose = require('mongoose');

const options = {
    timestamps:{
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    },
    collection: 'events'
}

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Workshop', 'Conference', 'Webinar', 'Other'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ticketDetails: {
      type: {
        type: String,
        enum: ['Free', 'Paid', 'VIP'],
        required: true,
      },
      price: {
        type: Number,
        required: function() {
          return this.type !== 'Free';
        },
      },
      availability: {
        type: Number,
        required: true,
      }
  },
  isRecurring: {
    type: Boolean,
    default: false,
  }
}, options);

module.exports = mongoose.model('Event', EventSchema);
