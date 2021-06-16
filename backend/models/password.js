const passwordValidator = require("password-validator");

let schema = new passwordValidator();

schema
    .is()
    .min(8)
    .is()
    .max(50)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123", "Mypass01", "Username1", "Qwerty123", "Azerty123", "Default1"]);

module.exports = schema;
