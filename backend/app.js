const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

require("dotenv").config();

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Successfully connected to MongoDB !"))
    .catch(() => console.log("Unable to connect to MongoDB !"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());

app.use("/api/auth", userRoutes);

app.use("/api/sauces", sauceRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(rateLimit());

app.use(helmet());

app.use(mongoSanitize());

module.exports = app;
