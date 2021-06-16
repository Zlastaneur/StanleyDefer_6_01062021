const schema = require("../models/password");

module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)) {
        res.status(401).json({
            error: "Password too weak !",
        });
    } else {
        next();
    }
};
