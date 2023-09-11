const express = require('express');
const { Addqualification, Getqualification, Getqualifications, Editqualification, Deletequalification } = require('../controllers/qualificationController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-qualification")
    .post(authenticateRoles(AllRoles), Addqualification);
router.route("/qualification/:_id")
    .get(authenticateRoles(AllRoles), Getqualification);
router.route("/qualifications")
    .get(authenticateRoles(AllRoles), Getqualifications);
router.route("/update-qualification/:_id")
    .post(authenticateRoles(AllRoles), Editqualification);
router.route("/delete-qualification/:_id")
    .post(authenticateRoles(AllRoles), Deletequalification);


// other operations
router.route("/qualification/:_id").get(Getqualification); // public route to get user's qualification details


module.exports = router;