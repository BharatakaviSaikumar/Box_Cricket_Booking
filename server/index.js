const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

const turfRoutes = require("./routes/turfRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", turfRoutes);
app.use("/api", bookingRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server Started");
});