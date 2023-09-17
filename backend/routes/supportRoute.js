const express = require('express');
const { ForgotPassword, ResetPassword, ResetPasswordPage, VerifyEmail, ResendVerificationMail, ContactUS } = require("../controllers/supportController");
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants');
const router = express.Router();


// router.route("/forgot-password").post(ForgotPassword);
// router.route("/reset-password/:token").get(ResetPasswordPage);
// router.route("/reset-password").post(ResetPassword);

router.route("/verify-email/:token").get(VerifyEmail);

router.route("/resend-verification-email")
    .post(authenticateRoles(AllRoles),
        ResendVerificationMail);

// router.route("/contact-us").post(ContactUS);

module.exports = router;