const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');
const auth = require('../middleware/auth');
const isAccessible = require("../middleware/isAccessible");

router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/', auth, isAccessible(["Organizer"]), eventController.createEvent);
router.put('/:eventId', auth, isAccessible(["Organizer"]), eventController.updateEvent);
router.delete('/:eventId', auth, isAccessible(["Organizer"]), eventController.deleteEvent);

module.exports = router;
