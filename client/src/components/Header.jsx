import React from "react";

// This will house our header and navigation for the site
const Header= ({setCurrentPage})=>{
    return(
        <header>
            <h1>Round Abouts</h1>
            <nav>
                <ul className="nav-links">
                    <li><button onClick={() => setCurrentPage('Home')}>Home |</button></li>
                    <li><button onClick={() => setCurrentPage('Login')}>Login |</button></li>
                    <li><button onClick={() => setCurrentPage('Register')}>Register |</button></li>
                    <li><button onClick={() => setCurrentPage('Trips')}>Trips</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
