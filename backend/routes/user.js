const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");
const emailValidation = require("../middleware/emailValidation");
const passValidation = require("../middleware/passValidation");
const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: " Too many attempts, try again in 5 minutes",
});

router.post("/signup", emailValidation, passValidation, userCtrl.signup);
router.post("/login", rateLimiter, userCtrl.login);

module.exports = router;
