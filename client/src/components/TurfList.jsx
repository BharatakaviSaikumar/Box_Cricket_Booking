import { useEffect, useState } from "react";

import axios from "axios";

import BookingSystem from "./BookingSystem";

function TurfList() {

    const [turfs, setTurfs] = useState([]);

    useEffect(() => {

        axios.get("https://box-cricket-booking.onrender.com/api/turfs")
        .then(res => setTurfs(res.data))
        .catch(err => console.log(err));

    }, []);

    return (

        <div>

            <h1>Available Turfs</h1>

            {
                turfs.map((turf) => (

                    <BookingSystem
                        key={turf._id}
                        turf={turf}
                    />

                ))
            }

        </div>
    );
}

export default TurfList;