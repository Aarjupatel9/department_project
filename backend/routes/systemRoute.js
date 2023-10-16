const express = require('express');
const { getAllVariables, uploadFile } = require('../controllers/systemController');
const authenticateRoles = require('../middlewares/authMiddleware');
const fileUploaderMiddleware = require('../middlewares/fileUploaderMiddleware');
const { ROLES, AllRoles } = require('../utils/constants')
const router = express.Router();

router.route("/getAllVariables").get(getAllVariables);

router.route('/upload-reports')
    .post(
        authenticateRoles(AllRoles),
        fileUploaderMiddleware('report', 'reports', 10), //fileType, fieldName, maxCount
        uploadFile
    );

router.route('/upload-certificates')
    .post(
        authenticateRoles(AllRoles),
        fileUploaderMiddleware('certificate', 'certificates', 10), //fileType, fieldName, maxCount
        uploadFile
    );


module.exports = router;