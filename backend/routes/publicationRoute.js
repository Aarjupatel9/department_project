const express = require('express');
const { Addpublication, Getpublication, Getpublications, Editpublication, Deletepublication } = require('../controllers/publicationController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations
router.route("/add-publication")
    .post(authenticateRoles(AllRoles), Addpublication);
router.route("/publication/:_id")
    .get(authenticateRoles(AllRoles), Getpublication);
router.route("/publications")
    .get(authenticateRoles(AllRoles), Getpublications);
router.route("/update-publication/:_id")
    .post(authenticateRoles(AllRoles), Editpublication);
router.route("/delete-publication/:_id")
    .post(authenticateRoles(AllRoles), Deletepublication);


// other operations
router.route("/publication/:_id").get(Getpublication); // public route to get user's publication details


module.exports = router;