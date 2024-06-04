import React from "react";
import {Link} from 'react-router-dom'

// This will house our header and navigation for the site
const Header= ()=>{
    return(
        <header>
            <h1>Round Abouts</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to= "/">Home</Link></li>
                    <li><Link to= "/login">Login</Link></li>
                    <li><Link to= "/register">Register</Link></li>
                    <li><Link to= "/trips">Trips</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
