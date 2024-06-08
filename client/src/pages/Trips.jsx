import React, {useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TripCards from '../components/TripCards/index';
import CreateTripForm from '../components/CreateTripForm/index';
import { QUERY_TRIPS } from '../Utils/queries';
import { ADD_ACTIVITY_TO_TRIP } from '../Utils/mutations';
import AuthService from '../Utils/auth';
import { Link } from'react-router-dom';



const Trips = () => {
  useEffect(() => {
    const user = AuthService.getUser();
    console.log('User:', user);
  }, []);

  // Made so that we can grab the id from the user object rather than just using userId
  const user = AuthService.getUser();
  console.log('User object:', user);
  const userId = user?.data?._id; 
  console.log('userId:', userId);

  const { loading, data, error, refetch } = useQuery(QUERY_TRIPS, {
    skip: !userId,
    variables: { userId },
  });

  const [addActivityToTrip] = useMutation(ADD_ACTIVITY_TO_TRIP);

  const handleAddActivity = (tripId) => {
    const activityName = prompt('Enter activity name:');
    const date = prompt('Enter activity date:');
    const description = prompt('Enter activity description:');
    const destination = prompt('Enter activity destination:');

    addActivityToTrip({
      variables: { tripId, activityName, date, description, destination },
    })
    .then(() => {
      refetch();
    })
    .catch((error) => {
      console.error("Could not add activity:", error);
    });
  };

  if (!userId) {
    return (
      <p>
        Please <Link to="/login">log in</Link> to create a new trip.
      </p>
    );
  }

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>Error loading trips: {error.message}</p>;

  console.log('Data from query:', data);
  if (!data || !data.user || !data.user.trips) {
    console.log('Trips data is not available yet.');
  }

  const trips = data?.user?.trips || [];

  console.log('Trips:', trips);

  return (
    <div>
      <h1>Your Trips</h1>
      <CreateTripForm refetchTrips={refetch} />
      {trips.length === 0 ? (
        <p>No trips planned yet. Start by creating a new trip!</p>
      ) : (
        <TripCards trips={trips} refetchTrips={refetch} onAddActivity={handleAddActivity} />
      )}
    </div>
  );
};

export default Trips;