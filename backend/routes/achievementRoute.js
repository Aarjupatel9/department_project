const express = require('express');
const { AddAchievement, GetAchievement, GetAchievements, EditAchievement, DeleteAchievement } = require('../controllers/achievementController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-achievement")
    .post(authenticateRoles(AllRoles), AddAchievement);
router.route("/achievement/:_id")
    .get(authenticateRoles(AllRoles), GetAchievement);
router.route("/achievements")
    .get(authenticateRoles(AllRoles), GetAchievements);
router.route("/update-achievement/:_id")
    .post(authenticateRoles(AllRoles), EditAchievement);
router.route("/delete-achievement/:_id")
    .post(authenticateRoles(AllRoles), DeleteAchievement);


// other operations
router.route("/achievement/:id").get(GetProfile); // public route to get user's achievement details


module.exports = router;