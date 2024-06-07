import React from 'react';

const TripCards = ({ trips }) => {

    if (!trips.length) {
        return <h3>No trips planned yet</h3>;
    }

    return (

        <div>

            <div>
                {trips &&
                    trips.map((trip) => {
                    <div key={trip._id} className="card">
                        <h3>{trip.tripName}</h3>
                        <ul>{trip.startDate} - {trip.endDate}</ul>
                        <ul>{trip.description}</ul>
                        <ul>{trip.activities}</ul>

                    </div>
                })}
            </div>




        </div>
    )
};

export default TripCards;

