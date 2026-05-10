import { useState } from "react";
import axios from "axios";

function BookingForm() {
    const slots = [
        6,7,8,9,10,11,12,
        13,14,15,16,17,
        18,19,20,21,22
    ];
    
    const [formData, setFormData] = useState({
        turfName: "",
        userName: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        hours: "",
        totalPrice: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const total = formData.hours * 1200;

        const start = new Date(
            `2000-01-01T${formData.startTime}`
        );

        start.setHours(
            start.getHours() + parseInt(formData.hours)
        );

        const endTime = start.toTimeString().slice(0,5);

        const updatedData = {
            ...formData,
            endTime,
            totalPrice: total
        };

        try {

            const res = await axios.post(
                "http://localhost:5000/api/book-slot",
                updatedData
            );

            alert(res.data.message);

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div>

            <h1>Book Turf</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="turfName"
                    placeholder="Turf Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="userName"
                    placeholder="Your Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="bookingDate"
                    onChange={handleChange}
                />

                <br /><br />
                
                <button onClick={() => setHours(1)}>
                    1 Hour
                </button>

                <button onClick={() => setHours(2)}>
                    2 Hours
                </button>  

                <input
                    type="number"
                    name="hours"
                    placeholder="Hours"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Book Now
                </button>

            </form>

        </div>
    );
}

export default BookingForm;