import { useState } from 'react';
import { ADD_TRIP } from '../../Utils/mutations';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../../Utils/auth';

export default CreateTripForm = () => {
    const [tripNameText, setTripNameText] = useState('');
    const [destinationText, setDestinationText] = useState('');
    const [startDateText, setStartDateText] = useState('');
    const [endDateText, setEndDateText] = useState(''); 
    const [descriptionText, setDescriptionText] = useState('');


    const [addTrip, { error }] = useMutation
        (ADD_TRIP, {
            refetchQueries: [

            ]
        });

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

            })

            setTripNameText('')

        } catch (err) {
            console.error(err);
        }
    };

   
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        switch(name) {
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
            <h2>Create A Trip Here!</h2>

            {Auth.loggedIn() ? (
                <>
                <form
                    className= "form"
                    onSubmit={handleFormSubmit}
                ></form>

                </>
            )
            :
            <p>
                You need to Log In first so we can help you plan your trip!
                <Link to='/login'>LOG IN</Link> or if you dont have an account <Link to='/register'>SIGN UP</Link>
            </p>
            }
        </div>
    )
    

};