const express = require('express');
const { Addguide, Getguide, Getguides, Editguide, Deleteguide } = require('../controllers/guideController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-guide")
    .post(authenticateRoles(AllRoles), Addguide);
router.route("/guide/:_id")
    .get(authenticateRoles(AllRoles), Getguide);
router.route("/guides")
    .get(authenticateRoles(AllRoles), Getguides);
router.route("/update-guide/:_id")
    .post(authenticateRoles(AllRoles), Editguide);
router.route("/delete-guide/:_id")
    .post(authenticateRoles(AllRoles), Deleteguide);


// other operations
router.route("/guide/:_id").get(Getguide); // public route to get user's guide details


module.exports = router;