const express = require("express");
const { DataFilter, FieldMetaData } = require("../controllers/dataController");
const authenticateRoles = require("../middlewares/authMiddleware");
const { ROLES } = require("../utils/constants");
const router = express.Router();

// admin or system coordinator specific operations
router
  .route("/metadata")
  // .get(authenticateRoles([ROLES.SYSTEM_COORDINATOR]), DataFilter);
  .get(FieldMetaData);

router
  .route("/data-filter")
  // .get(authenticateRoles([ROLES.SYSTEM_COORDINATOR]), DataFilter);
  .get(DataFilter);


module.exports = router;
