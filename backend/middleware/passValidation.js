const pass = require("../models/password");

module.exports = (req, res, next) => {
    if (!pass.validate(req.body.password)) {
        res.status(401).json({
            error: "Password too weak !",
        });
    } else {
        next();
    }
};
