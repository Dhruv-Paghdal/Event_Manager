const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const auth = require('../middleware/auth');
const isAccessible = require("../middleware/isAccessible");

router.get('/overview', auth, isAccessible(["Organizer"]), dashboardController.getOverviewStats);
router.get('/events', auth, isAccessible(["Organizer"]), dashboardController.getOrganizerEvents);
router.get('/registrations/:eventId', auth, isAccessible(["Organizer"]), dashboardController.getEventTickets);

module.exports = router;
