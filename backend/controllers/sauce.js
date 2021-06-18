const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // ?
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    sauce
        .save()
        .then(() => res.status(201).json({ message: "Object saved !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          }
        : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Object modified !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Object deleted !" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status.apply(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;

    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const isLiked = sauce.usersLiked.includes(userId);
            const isDisliked = sauce.usersDisliked.includes(userId);
            const likedOrDisliked = isLiked || isDisliked;

            if (!likedOrDisliked) {
                let message = "";
                let update = {};

                if (like === 1) {
                    message = "Liked";
                    update = { $push: { usersLiked: userId }, $inc: { likes: +1 } };
                } else if (like === -1) {
                    message = "Disliked";
                    update = { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } };
                }
                return Sauce.updateOne({ _id: req.params.id }, update)
                    .then(() => res.status(200).json({ message }))
                    .catch((error) => res.status(400).json({ error }));
            }

            if (likedOrDisliked) {
                let message = "";
                let update = {};
                if (isLiked) {
                    message = "Now Liked";
                    update = { $pull: { usersLiked: userId }, $inc: { likes: -1 } };
                } else if (isDisliked) {
                    message = "Now Disliked";
                    update = { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } };
                }
                return Sauce.updateOne({ _id: req.params.id }, update)
                    .then(() => res.status(200).json({ message }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};
