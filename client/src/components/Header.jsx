import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Utils/auth';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

//   authenticate our login and handle the logout
  useEffect(() => {
    const isLoggedIn = AuthService.loggedIn();
    setIsAuthenticated(isLoggedIn);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <header>
      <h1>Round Abouts</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <li><Link onClick={handleLogout}>Logout</Link></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/trips">Trips</Link></li>
            </>
              )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;