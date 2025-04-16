import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Navbar.css';

function Navbar() {
    return (
        <nav style={{
            backgroundColor: '#388e3c',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/venues" className="nav-link">Venues</Link>
                <Link to="/vendors" className="nav-link">Vendors</Link>
                <Link to="/events" className="nav-link">Events</Link>
            </div>
            <LogoutButton />
        </nav>
    );
}

export default Navbar;
