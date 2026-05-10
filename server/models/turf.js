const mongoose = require("mongoose");

const TurfSchema = new mongoose.Schema({
    turfName: String,
    location: String,
    pricePerHour: Number,
    image: String
});

module.exports = mongoose.model("Turf", TurfSchema);