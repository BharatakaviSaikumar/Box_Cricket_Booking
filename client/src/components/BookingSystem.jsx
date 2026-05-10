import { useEffect, useState } from "react";
import axios from "axios";

function BookingSystem({ turf }) {

    const [showBooking, setShowBooking] = useState(false);

    const [hours, setHours] = useState(1);

    const [bookingDate, setBookingDate] = useState("");

    const [bookings, setBookings] = useState([]);

    const slots = [
        6,7,8,9,10,11,12,
        13,14,15,16,17,
        18,19,20,21,22
    ];

    useEffect(() => {

        axios.get("http://localhost:5000/api/bookings")
        .then(res => setBookings(res.data))
        .catch(err => console.log(err));

    }, []);

    const handleBooking = async (slot) => {

        if(!bookingDate){

            alert("Please Select Date");

            return;
        }

        const bookingData = {

            turfId: turf._id,

            turfName: turf.turfName,

            bookingDate,

            startHour: slot,

            endHour: slot + hours,

            hours,

            totalPrice: hours * turf.pricePerHour

        };

        try {

            const res = await axios.post(
                "http://localhost:5000/api/book-slot",
                bookingData
            );

            if(res.data.message === "Booking Successful"){

                alert("Booked Successfully");

                setShowBooking(false);

                const updatedBookings = await axios.get(
                    "http://localhost:5000/api/bookings"
                );

                setBookings(updatedBookings.data);

            }
            else{

                alert("Slot Occupied");

            }

        } catch(err){

            console.log(err);

        }
    };

    return (

        <div
            style={{
                border:"1px solid gray",
                padding:"20px",
                margin:"20px",
                width:"350px",
                borderRadius:"10px",
                textAlign:"center"
            }}
        >

            <img
                src={turf.image}
                width="300"
                height="200"
                alt="turf"
                style={{
                    borderRadius:"10px"
                }}
            />

            <h2>{turf.turfName}</h2>

            <p>{turf.location}</p>

            <p>₹{turf.pricePerHour}/hour</p>

            <button
                onClick={() => setShowBooking(true)}
                style={{
                    padding:"10px",
                    backgroundColor:"black",
                    color:"white",
                    border:"none",
                    borderRadius:"5px",
                    cursor:"pointer"
                }}
            >
                Book Now
            </button>

            {
                showBooking && (

                    <>

                        <br /><br />

                        <input
                            type="date"
                            onChange={(e) =>
                                setBookingDate(e.target.value)
                            }
                        />

                        <br /><br />

                        <button
                            onClick={() => setHours(1)}
                        >
                            1 Hour
                        </button>

                        <button
                            onClick={() => setHours(2)}
                            style={{marginLeft:"10px"}}
                        >
                            2 Hours
                        </button>

                        <button
                            onClick={() => setHours(3)}
                            style={{marginLeft:"10px"}}
                        >
                            3 Hours
                        </button>

                        <br /><br />

                        {
                            slots.map((slot) => {

                                const occupied = bookings.some(

                                    booking =>

                                        booking.bookingDate === bookingDate &&

                                        booking.turfId === turf._id &&

                                        booking.startHour < slot + hours &&

                                        booking.endHour > slot
                                );

                                return (

                                    <button

                                        key={slot}

                                        disabled={occupied}

                                        onClick={() =>
                                            handleBooking(slot)
                                        }

                                        style={{
                                            margin:"5px",
                                            padding:"10px",
                                            border:"none",
                                            borderRadius:"8px",
                                            backgroundColor:
                                                occupied
                                                ? "gray"
                                                : "green",
                                            color:"white",
                                            cursor:"pointer"
                                        }}
                                    >

                                        {slot}:00 -
                                        {slot + hours}:00

                                    </button>
                                );
                            })
                        }

                    </>

                )
            }

        </div>
    );
}

export default BookingSystem;