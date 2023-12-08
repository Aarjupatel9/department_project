const express = require('express');
const { AddGuide, GetGuide, GetGuides, EditGuide , DeleteGuide} = require('../controllers/guideController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/addGuide")
    .post(authenticateRoles(AllRoles), AddGuide);
router.route("/guide/:_id")
    .post(authenticateRoles(AllRoles), GetGuide);
router.route("/guides")
    .post(authenticateRoles(AllRoles), GetGuides);
router.route("/updateGuide/:_id")
    .post(authenticateRoles(AllRoles), EditGuide);
router.route("/deleteGuide/:_id")
    .post(authenticateRoles(AllRoles), DeleteGuide);


// other operations
router.route("/guide/:_id").post(GetGuide); // public route to get user's guide details


module.exports = router;