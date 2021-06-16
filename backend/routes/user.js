const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const passValidation = require("../middleware/passValidation");

router.post("/signup", passValidation, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
