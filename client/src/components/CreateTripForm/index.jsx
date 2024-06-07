import { useState } from 'react';
import { ADD_TRIP } from '../../Utils/mutations';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../../Utils/auth';

const CreateTripForm = () => {
    const [tripNameText, setTripNameText] = useState('');
    const [destinationText, setDestinationText] = useState('');
    const [startDateText, setStartDateText] = useState('');
    const [endDateText, setEndDateText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');


    const [addTrip, { error }] = useMutation
        (ADD_TRIP);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addTrip({
                variables: {
                    tripNameText,
                    destinationText,
                    startDateText,
                    endDateText,
                    descriptionText
                },

            });

            setTripNameText('');
            setDescriptionText('');
            setDestinationText('');
            setStartDateText('');
            setEndDateText('');

        } catch (err) {
            console.error(err);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'tripNameText':
                setTripNameText(value);
                break;
            case 'destinationText':
                setDestinationText(value);
                break;
            case 'startDateText':
                setStartDateText(value);
                break;
            case 'endDateText':
                setEndDateText(value);
                break;
            case 'descriptionText':
                setDescriptionText(value);
                break;

        }
    }

    return (
        <div>
            

            {Auth.loggedIn() ? (
                <>
                    <h3>Lets start your trip by filling out this form</h3>
                    <form className="form" onSubmit={handleFormSubmit}>
                        <input
                            name='tripNameText'
                            type='text'
                            value={tripNameText}
                            placeholder='Name Your Trip!'
                            onChange={handleChange}
                        />

                        <input
                            name='destinationText'
                            type='text'
                            value={destinationText}
                            placeholder='Where will you be traveling to?'
                            onChange={handleChange}
                        />
                        <input
                            name='startDateText'
                            type='text'
                            value={startDateText}
                            placeholder='When will your trip start?'
                            onChange={handleChange}
                        />
                        <input
                            name='endDateText'
                            type='text'
                            value={endDateText}
                            placeholder='When will your trip end?'
                            onChange={handleChange}
                        />
                        <input
                            name="descriptionText"
                            type='text'
                            value={descriptionText}
                            placeholder='Describe your trip here (optional)'
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-block btn-primary"
                            
                            type="submit"
                            onSubmit={handleFormSubmit}
                        >
                            Submit
                        </button>



                    </form>

                </>
            )
                :
                <p>
                    Log In first so we can help you plan your trip!
                    <Link to='/login'> LOG IN </Link> or if you dont have an account <Link to='/register'> SIGN UP </Link>
                </p>
            }
        </div>
    )


};

export default CreateTripForm;