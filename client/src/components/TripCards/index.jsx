import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import AuthService from '../../Utils/auth'
import { QUERY_TRIPS } from '../../Utils/queries';
import { ADD_ACTIVITY_TO_TRIP, REMOVE_TRIP } from '../../Utils/mutations';


const TripCards = ({ trips }) => {

    const [formStatus, setFormStatus] = useState('hide');
    const [btnText, setBtnText] = useState('Add an activity');
    const [activityNameText, setActivityNameText] = useState('');
    const [descriptionNameText, setDescriptionText] = useState('');
    const [dateText, setDateText] = useState('');
    const [destinationText, setDestinationText] = useState('');
    const [currentTripId, setCurrentTripId] = useState(null);

    const [addActivity] = useMutation(ADD_ACTIVITY_TO_TRIP);
    const [removeTrip]= useMutation(REMOVE_TRIP)


    const displayForm = (tripId) => {
        setCurrentTripId(tripId);
        setFormStatus(formStatus === 'form' ? 'hide' : 'form');
        setBtnText(btnText === 'Submit' ? 'Add an activity' : 'Submit');
        console.log(`Form status for trip ${tripId}: ${formStatus}`);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'activityName':
                setActivityNameText(value);
                break;
            case 'description':
                setDescriptionText(value);
                break;
            case 'destination':
                setDestinationText(value);
                break;
            case 'date':
                setDateText(value);
                break;
            default:
                break;
        }
    }
        // Add activity
        const handleFormSubmit = async (event) => {

            event.preventDefault();

            try {
                const { data } = await addActivity({
                    variables: {
                    activityName: activityNameText,
                    date: dateText,
                    description: descriptionText,
                    destination: destinationText,
                    tripId: currentTripId,
                    },
                });
                console.log('Activity created:', data);

                setActivityNameText('');
                setDescriptionText('');
                setDateText('');
                setDestinationText('');
                setFormStatus('hide');
                setBtnText('Add an activity');
                refetchTrips();

            } catch (err) {
                console.error('Error creating activity:', err);
                console.log('Error details:', err.networkError?.result?.errors || err);
            }
        };

        // Delete the trip
        const handleDelete = async (tripId) => {
            console.log('Deleting trip with ID:', tripId);
            if (!tripId) {
                console.error('Trip ID is undefined!');
                return;
            }
            try {
                const { data } = await removeTrip({
                    variables: { tripId },
                    refetchQueries: [{ query: QUERY_TRIPS, variables: { userId: AuthService.getUser()._id } }],
                });
                console.log('Trip deleted:', data);
                refetchTrips();
            } catch (error) {
                if (error.networkError) {
                    console.log('Network error:', error.networkError);
                    if (error.networkError.result && error.networkError.result.errors) {
                        console.log('GraphQL errors:', error.networkError.result.errors);
                    }
                } else if (error.graphQLErrors) {
                    console.log('GraphQL errors:', error.graphQLErrors);
                }
            }
        };
        return (

            <div>
                <div>
                    {trips &&
                        trips.map((trip) => (
                            // Section for the trip card
                            <div key={trip._id} className="card">
                                <div className='tripCard'>
                                <h3 className='title'>{trip.tripName}</h3>
                                <ul>{trip.startDate} / {trip.endDate}</ul>
                                <ul>{trip.description}</ul>
                                <ul>{trip.activities}</ul>
                                </div>
                                <button onClick={displayForm} className="btn btn-block btn-primary" type="submit"> {btnText}</button>

                                {/* Section for the activity form */}
                                <form className={formStatus} onSubmit={handleFormSubmit}>
                                    <input name='activityName' type='text' value={activityNameText} placeholder='Name Your Activity' onChange={handleChange}/>

                                    <input name='destination' type='text' value={destinationText} placeholder='Enter Destination' onChange={handleChange} />

                                    <input name='description' type='text' value={descriptionNameText} placeholder='Describe your Activity (optional)' onChange={handleChange} />

                                    <input name='date' type='date' value={dateText} onChange={handleChange}/>
                                </form>

                                <button onClick={() => handleDelete(trip._id)} className="btn btn-block btn-danger" type="button">Delete</button>
                               
                            </div>
                        ))}
                </div>
            </div>
        )
    };

export default TripCards;

