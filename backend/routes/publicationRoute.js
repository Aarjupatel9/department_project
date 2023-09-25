const express = require('express');
const { AddPublication, GetPublication, GetPublications, EditPublication, DeletePublication } = require('../controllers/publicationController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

GetPublication
// user specific operations

router.route("/add-publication")
    .post(authenticateRoles(AllRoles), AddPublication);
router.route("/publication/:_id")
    .post(authenticateRoles(AllRoles), GetPublication);
router.route("/publications")
    .post(authenticateRoles(AllRoles), GetPublications);
router.route("/update-publication/:_id")
    .post(authenticateRoles(AllRoles), EditPublication);
router.route("/delete-publication/:_id")
    .post(authenticateRoles(AllRoles), DeletePublication);
// other operations
router.route("/publication/:_id").get(GetPublication); // public route to get user's publication details


module.exports = router;