import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ACTIVITY_TO_TRIP } from '../../Utils/mutations';


const TripCards = ({ trips }) => {

    const [formStatus, setFormStatus] = useState('hide');
    const [btnText, setBtnText] = useState('Add an activity');
    const [activityNameText, setActivityNameText] = useState('');
    const [descriptionNameText, setDescriptionText] = useState('');
    const [dateText, setDateText] = useState('');
    const [destinationText, setDestinationText] = useState('');

    const [addActivity, { error }] = useMutation(ADD_ACTIVITY_TO_TRIP);



    const displayForm = async () => {
        setFormStatus('form');
        setBtnText('submit');
    }

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
            case 'date':
                setDateText(value);
            default:
                break;
        }
    }
        const handleFormSubmit = async (event) => {

            event.preventDefault();

            try {
                const { data } = await addActivity({
                    variables: {
                        activityNameText,
                        date,
                        description,
                        destination,

                    },
                });
                console.log('Activity created:', data);

                setActivityNameText('');
                setDescriptionText('');
                setDateText('');
                setDestinationText('');
                setFormStatus('hide');
                setBtnText('Add an activity');
                //   refetchTrips(); 

            } catch (err) {
                console.error('Error creating activity:', err);
                console.log('Error details:', err.networkError?.result?.errors || err);
            }
        };

    

        return (

            <div>

                <div>
                    {trips &&
                        trips.map((trip) => (
                            <div key={trip._id} className="card">
                                <h3>{trip.tripName}</h3>
                                <ul>{trip.startDate} - {trip.endDate}</ul>
                                <ul>{trip.description}</ul>
                                <ul>{trip.activities}</ul>
                                <button
                                    onClick={displayForm}
                                    className="btn btn-block btn-primary"
                                    type="submit"
                                >
                                    {btnText}
                                </button>

                                <form className={formStatus} onSubmit={handleFormSubmit}>
                                    <input
                                        name='activityName'
                                        type='text'
                                        value={activityNameText}
                                        placeholder='Name Your Activity'
                                        onChange={handleChange}

                                    />

                                    <input
                                        name='destination'
                                        type='text'
                                        value={destinationText}
                                        placeholder='Enter Destination'
                                        onChange={handleChange}

                                    />

                                    <input
                                        name='description'
                                        type='text'
                                        value={descriptionNameText}
                                        placeholder='Decribe your Activity (optional)'
                                        onChange={handleChange}

                                    />

                                    <input
                                        name='date'
                                        type='date'
                                        value={dateText}
                                        onChange={handleChange}

                                    />



                                </form>

                            </div>
                        ))}
                </div>




            </div>
        )
    };

export default TripCards;

