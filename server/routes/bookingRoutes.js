const express = require("express");

const router = express.Router();

const Booking = require("../models/Booking");

router.post("/book-slot", async (req, res) => {

    try {

        const existingBooking = await Booking.findOne({

            bookingDate: req.body.bookingDate,

            turfId: req.body.turfId,

            startHour: { $lt: req.body.endHour },

            endHour: { $gt: req.body.startHour }

        });

        if(existingBooking){

            return res.json({
                message: "Slot Occupied"
            });

        }

        const booking = new Booking(req.body);

        await booking.save();

        res.json({
            message: "Booking Successful"
        });

    } catch(err){

        console.log(err);

    }

});

router.get("/bookings", async (req, res) => {

    const bookings = await Booking.find();

    res.json(bookings);

});

module.exports = router;