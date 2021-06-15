const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    //_id: { type: Object, required: true }, // ? id ou _id ?
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    userLiked: { type: [String], required: true },
    userDisliked: { type: [String], required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);
