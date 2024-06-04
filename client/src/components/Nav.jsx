import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav= ()=> (
    <nav>
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/Login'>Login</NavLink>
            </li>
            <li>
                <NavLink to='/Register'>Register</NavLink>
            </li>
            <li>
                <NavLink to='/Trips'>Trips</NavLink>
            </li>
        </ul>
    </nav>
);

export default Nav;

