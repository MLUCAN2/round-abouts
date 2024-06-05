import { useQuery } from '@apollo/client';


const TripCards = () => {
    const trips = trips || [];

    
    
    
    
    return (

        <div>
            {!trips.length ? (
                <>
                    <h3>No trips planned yet</h3>
                </>
            )
                :
                <div>
                    {trips.map((trip) => {
                        <div key={trip.id} className="card">
                            <h3>{trip.tripName}</h3>
                            <ul>{trip.startDate} - {trip.endDate}</ul>
                            <ul>{trip.description}</ul>
                            <ul>{trip.activities}</ul>

                        </div>
                    })}
                </div>



            }
        </div>
    )
};

export default TripCards;