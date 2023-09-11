const express = require('express');
const { AddEvent, GetEvent, GetEvents, EditEvent, DeleteEvent } = require('../controllers/eventController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-event")
    .post(authenticateRoles(AllRoles), AddEvent);
router.route("/event/:_id")
    .get(authenticateRoles(AllRoles), GetEvent);
router.route("/events")
    .get(authenticateRoles(AllRoles), GetEvents);
router.route("/update-event/:_id")
    .post(authenticateRoles(AllRoles), EditEvent);
router.route("/delete-event/:_id")
    .post(authenticateRoles(AllRoles), DeleteEvent);


// other operations
router.route("/Event/:_id").get(GetEvent); // public route to get user's Event details


module.exports = router;