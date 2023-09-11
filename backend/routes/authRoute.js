const express = require('express');
const { Login, LogOut, Register, ResendEmailVerificationLink } = require("../controllers/authController");
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/resendEmailVerificationLink").post(ResendEmailVerificationLink);

// protected routes
router.route("/logout").post(authenticateRoles(AllRoles), LogOut);


module.exports = router;