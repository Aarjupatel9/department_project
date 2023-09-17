const express = require('express');
const { GetUser, GetAllUsers, DeleteUser, ResetPass, EditUser, GetNewUsers, EditUseAccountRole, EditUserVerification, EditUseAccountApproval } = require('../controllers/userController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES, AllRoles } = require('../utils/constants')
const router = express.Router();

router.route("/getUser")
    .post(authenticateRoles(AllRoles), GetUser);

router.route("/getUsers")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR, ROLES.STAFF]), GetAllUsers);

router.route("/getNewUsers")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), GetNewUsers);

router.route("/updateUserVerification")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), EditUserVerification);
router.route("/updateUserAccountRole")
    .post(authenticateRoles([ROLES.HEAD]), EditUseAccountRole);
router.route("/updateAccountApproval")
    .post(authenticateRoles([ROLES.HEAD]), EditUseAccountApproval);

router.route("/updateUser")
    .post(authenticateRoles(AllRoles), EditUser);
router.route("/deleteUser")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), DeleteUser);
router.route("/update-password")
    .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), ResetPass);

module.exports = router;