const express = require('express');
const { AddEvent, GetEvent, GetEvents, EditEvent, DeleteEvent } = require('../controllers/eventController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-event")
    .post(authenticateRoles(AllRoles), AddEvent);
router.route("/event/:_id")
    .post(authenticateRoles(AllRoles), GetEvent);
router.route("/events")
    .post(authenticateRoles(AllRoles), GetEvents);
router.route("/update-event")
    .post(authenticateRoles(AllRoles), EditEvent);
router.route("/delete-event")
    .post(authenticateRoles(AllRoles), DeleteEvent);

// other operations
router.route("/Event").get(GetEvent); // public route to get user's Event details


module.exports = router;