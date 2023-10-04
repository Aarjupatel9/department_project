const express = require('express');
const { AddQualification, GetQualification, GetQualifications, EditQualification, DeleteQualification } = require('../controllers/qualificationController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-qualification")
    .post(authenticateRoles(AllRoles), AddQualification);
router.route("/qualification/:_id")
    .post(authenticateRoles(AllRoles), GetQualification);
router.route("/qualifications")
    .post(authenticateRoles(AllRoles), GetQualifications);
router.route("/update-qualification/:_id")
    .post(authenticateRoles(AllRoles), EditQualification);
router.route("/delete-qualification/:_id")
    .post(authenticateRoles(AllRoles), DeleteQualification);


// other operations
router.route("/qualification/:_id").get(GetQualification); // public route to get user's qualification details


module.exports = router;