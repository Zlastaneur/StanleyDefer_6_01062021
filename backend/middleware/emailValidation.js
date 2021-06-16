const email = require("email-validator");

email.validate("test@email.com");

module.exports = (req, res, next) => {
    if (!email.validate(req.body.email)) {
        res.status(401).json({
            error: "Incorrect email format!",
        });
    } else {
        next();
    }
};
