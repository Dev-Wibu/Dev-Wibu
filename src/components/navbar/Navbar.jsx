// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Tân Page</div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/1">1#</Link></li>
        <li><Link to="/2">2#</Link></li>
        <li><Link to="/3">3#</Link></li>
        <li>
          <Link to="/login" className="login-button">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
