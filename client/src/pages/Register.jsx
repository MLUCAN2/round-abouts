// export default function Register () {
    
// }

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../Utils/mutations';
import { useNavigate } from 'react-router-dom';

import Auth from '../Utils/auth';

const Register= (props)=> {
    const [formState, setFormData]= useState({firstName: '', lastName: '', email: '', password: ''})
    const [addUser, { error, data }] = useMutation(ADD_USER);

    // Used to define our navigation once we login
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });

        setFormState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: {
                    firstName: formState.firstName,
                    lastName: formState.lastName,
                    email: formState.email,
                    password:  formState.password,
                },
            });

            Auth.login(data.addUser.token);
            // Will automatically redirect the user to the homepage
            navigate('/');
        } 
        catch (err) {
            console.error(err);
        }
    }
    return(
        <main className='registration'>
            <h2>Register</h2>
            <section className='register-form'>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' name='firstName' id='firstName' value={formState.firstName} onChange={handleChange} />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' name='lastName' id='lastName' value={formState.lastName} onChange={handleChange} />

                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' value={formState.email} onChange={handleChange} />

                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' value={formState.password} onChange={handleChange} />

                    <button className='submit-button' style={{cursor: 'pointer'}} type='submit'>Submit</button>
                </form>
            </section>
        </main>
    )
};

export default Register;