import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../Utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../Utils/auth';

const Register = (props) => {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className='input-card'>
            <h2 className='input-form-header'>Register</h2>
            <section>
                <form className="input-form" onSubmit={handleFormSubmit}>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        className='form-input'
                        placeholder='First Name'
                        value={formState.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        className='form-input'
                        placeholder='Last Name'
                        value={formState.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='email'
                        id='email'
                        className='form-input'
                        placeholder='Email'
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='form-input'
                        placeholder='Password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button style={{ cursor: 'pointer' }} type='submit'>Submit</button>
                </form>
                {error && <div className="error-message">Registration failed: {error.message}</div>}
                {data && <div className="success-message">Registration successful!</div>}
            </section>
        </main>
    );
};

export default Register;