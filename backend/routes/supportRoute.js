const express = require('express');
const { ForgotPassword, ResetPassword, ResetPasswordPage, VerifyEmail, ResendVerificationMail, ContactUS } = require("../controllers/supportController");
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();


// router.route("/forgot-password").post(ForgotPassword);
// router.route("/reset-password/:token").get(ResetPasswordPage);
// router.route("/reset-password").post(ResetPassword);

router.route("/verify-email/:token").get(VerifyEmail);

// router.route("/resend-verification-email").post(authenticateJWT, ResendVerificationMail);

// router.route("/contact-us").post(ContactUS);

module.exports = router;