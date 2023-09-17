const express = require('express');
const { GetProfile, EditProfile, DeleteProfile, uploadProfileImage } = require('../controllers/profileController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants');
const fileUploaderMiddleware = require('../middlewares/fileUploaderMiddleware');
const router = express.Router();

// user specific operations

router.route('/upload-Profile-Image').post(
    authenticateRoles(AllRoles),
    fileUploaderMiddleware('profileImage', 'profileImage', 1), // fieldName, directoryName, maxCount
    uploadProfileImage
);

router.route("/getProfile")
    .post(authenticateRoles(AllRoles), GetProfile);
router.route("/updateProfile")
    .post(authenticateRoles(AllRoles),
        // fileUploaderMiddleware('profileImage', 'profileImage', 1), // fieldName, directoryName, maxCount
        EditProfile
    );
router.route("/deleteProfile")
    .post(authenticateRoles(AllRoles), DeleteProfile);


// other operations
router.route("/profile/:id").get(GetProfile); // public route to get user's profile details


module.exports = router;