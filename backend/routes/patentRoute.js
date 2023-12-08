const express = require('express');
const { AddPatent, GetPatent, EditPatent, DeletePatent, GetPatents } = require('../controllers/patentController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/addPatent")
    .post(authenticateRoles(AllRoles), AddPatent);
router.route("/getPatent")
    .post(authenticateRoles(AllRoles), GetPatent);
router.route("/getPatents")
        .post(authenticateRoles(AllRoles), GetPatents);
router.route("/updatePatent/:_id")
    .post(authenticateRoles(AllRoles), EditPatent);
router.route("/deletePatent/:_id")
    .post(authenticateRoles(AllRoles), DeletePatent);


// other operations
router.route("/patent/:_id").get(GetPatent); router.route("/patent/:_id").post(GetPatent); // public route to get user's patent details


module.exports = router;