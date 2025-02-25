const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticketController');
const auth = require('../middleware/auth');
const isAccessible = require("../middleware/isAccessible");


router.post('/purchase', auth, ticketController.purchaseTicket);
router.get('/event/:eventId', auth, isAccessible(["Organizer"]), ticketController.getTicketsByEvent);
router.get('/user', auth, ticketController.getUserTickets);

module.exports = router;
