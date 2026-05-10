const express = require("express");

const router = express.Router();

const Turf = require("../models/Turf");

router.get("/turfs", async (req, res) => {

    const turfs = await Turf.find();

    res.json(turfs);

});

router.post("/add-turf", async (req, res) => {

    const newTurf = new Turf(req.body);

    await newTurf.save();

    res.json({
        message: "Turf Added"
    });

});

module.exports = router;