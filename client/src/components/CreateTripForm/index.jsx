import { useState } from 'react';
import { ADD_TRIP } from '../../Utils/mutations';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import AuthService from '../../Utils/auth';

const CreateTripForm = ({ refetchTrips }) => {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const [addTrip, { error }] = useMutation(ADD_TRIP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTrip({
        variables: {
          tripName,
          destination,
          startDate,
          endDate,
          description: description || "N/A",  
        },
      });

      console.log('Trip created:', data);

      setTripName('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      refetchTrips(); 

    } catch (err) {
      console.error('Error creating trip:', err);
      console.log('Error details:', err.networkError?.result?.errors || err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'tripName':
        setTripName(value);
        break;
      case 'destination':
        setDestination(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {AuthService.loggedIn() ? (
        <>
          <h3>Let's start your trip by filling out this form</h3>
          <form className="form" onSubmit={handleFormSubmit}>
            <input
              name="tripName"
              type="text"
              value={tripName}
              placeholder="Name Your Trip!"
              onChange={handleChange}
            />
            <input
              name="destination"
              type="text"
              value={destination}
              placeholder="Where will you be traveling to?"
              onChange={handleChange}
            />
            <input
              name="startDate"
              type="date"
              value={startDate}
              onChange={handleChange}
            />
            <input
              name="endDate"
              type="date"
              value={endDate}
              onChange={handleChange}
            />
            <input
              name="description"
              type="text"
              value={description}
              placeholder="Describe your trip here (optional)"
              onChange={handleChange}
            />
            <button
              className="btn btn-block btn-primary"
              type="submit"
            >
              Submit
            </button>
          </form>
          {error && <p>Error creating trip: {error.message}</p>}
        </>
      ) : (
        <p>
          Log In first so we can help you plan your trip!
          <Link to="/login"> LOG IN </Link> or if you don't have an account <Link to="/register"> SIGN UP </Link>
        </p>
      )}
    </div>
  );
};

export default CreateTripForm;
