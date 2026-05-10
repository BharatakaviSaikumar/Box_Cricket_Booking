const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

    turfId: String,

    turfName: String,

    bookingDate: String,

    startHour: Number,

    endHour: Number,

    hours: Number,

    totalPrice: Number

});

module.exports = mongoose.model("Booking", BookingSchema);