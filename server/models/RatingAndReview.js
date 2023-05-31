const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: Number,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    }


});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);