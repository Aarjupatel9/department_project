const User = require("../models/userModel");
const { genJWTToken } = require("../services/JWTservice");
const { userLoginValidator, userSignupValidator } = require("../validators/authValidator");
const { hashPassword, compareHash } = require("../services/hashPassword");
const sendMail = require("../services/sendMail");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const profileModel = require("../models/profileModel");

const CookieOptions = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
    sameSite: "none"
};

const hostName = process.env.HOST;


exports.Login = async (req, res) => {
    try {
        console.log("login request : ", req.body)
        const { error } = userLoginValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist." });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({ success: false, message: "Verification email is already send, please verify your email by click on the given Link in Mail" });
        }

        const isMatch = await compareHash(password, user.password);

        if (isMatch) {
            const payload = {
                _id: user._id,
                email: user.email,
                role: user.role
            };

            // Sign token
            const token = genJWTToken(payload);

            // await user.save();

            const userProfile = await profileModel.findById(user._id);
            
            const { password, ...userData } = user.toObject();

            res.status(200).
                cookie("token", token, CookieOptions).
                json({
                    success: true,
                    message: "logged in successfully",
                    user: userData,
                    userProfile: userProfile
                });

        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials !!!" });
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });

    }
}
exports.ResendEmailVerificationLink = async (req, res) => {
    try {
        console.log("RegistrationLinkReSend request : ", req.body)
        const { error } = userLoginValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "This email is not register" });
        }
        const isMatch = await compareHash(password, user.password);
        if (isMatch && !user.isEmailVerified) {

            const verificationToken = genJWTToken({ email: user.email }, "verify-Email");
            const verificationLink = `${hostName}/api/support/verify-email/${verificationToken}`;

            const template = fs.readFileSync(
                path.join(__dirname, "../view/email-verification.ejs"),
                "utf8");

            const html = ejs.render(template, { verificationLink });

            try {
                await sendMail(user.email, "Email verification", "", html);

                res.status(200).
                    json({
                        success: true,
                        message: "Email verification link has been resend to you on mail !!! please verify your email before time limit !!!",
                        user: user
                    });

            } catch (error) {
                console.error("Error sending email:", error);
                return res.
                    status(500).
                    json({
                        success: false,
                        message: "Error sending verification email! please try later!!!"
                    });
            }

        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials !!!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.Register = async (req, res) => {
    try {

        const { error } = userSignupValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { email, password: userPass } = req.body;

        const user = await User.findOne({ email: email });

        if (user) {
            return res.
                status(400).
                json({ success: false, message: "Email already exists" });

        } else {

            const hash = await hashPassword(userPass);

            const newUser = new User({
                email: email,
                password: hash
            });

            const payload = {
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role
            };


            // Sign token
            const token = genJWTToken(payload);

            // Update the lastLoggedInTime field
            // newUser.lastLoginIp = req.ipAddress;
            // newUser.lastLoggedInTime = Date.now();
            await newUser.save();


            const verificationToken = genJWTToken({ email: newUser.email }, "verify-Email");
            const verificationLink = `${hostName}/api/support/verify-email/${verificationToken}`;

            const template = fs.readFileSync(
                path.join(__dirname, "../view/email-verification.ejs"),
                "utf8");
            const html = ejs.render(template, { verificationLink });
            try {
                await sendMail(newUser.email, "Email verification", "", html);
            } catch (error) {
                console.error("Error sending email:", error);
                return res.
                    status(500).
                    json({
                        success: false,
                        message: "Error sending verification email! please try later!!!"
                    });
            }

            const { password, ...user } = newUser.toObject();
            res.status(200).
                cookie("token", token, CookieOptions).
                json({
                    success: true,
                    message: "Registered in successfully and An Email verification link has been send to you on mail !!! please verify your email !!!",
                    user: user
                });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.LogOut = async (req, res) => {
    try {
        console.log("here in logout");
        res.clearCookie("token");
        res.status(200).send({ success: "true", message: "Successfully Logged Out" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
