import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VenueListPage from './pages/VenueListPage';
import VenueDetailPage from './pages/VenueDetailPage';
import VendorListPage from './pages/VendorListPage';
import VendorDetailPage from './pages/VendorDetailPage';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
import HomePage from './pages/HomePage';
import DarkModeToggle from './components/DarkModeToggle';  // Import Toggle
import './styles.css';

function App() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setLoading(false);
    }, [location]);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    return (
        <div>
            <nav className="navbar">
                <div className="hero-section">
                    <h1 className="hero-heading">Event Planner</h1>
                    <p className="hero-subheading">Make your event memorable with the perfect match!</p>
                </div>
                <div>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/home" className="nav-link">Home</Link>
                            <Link to="/venues" className="nav-link">Venues</Link>
                            <Link to="/vendors" className="nav-link">Vendors</Link>
                            <Link to="/events" className="nav-link">Events</Link>
                            <LogoutButton />
                        </>
                    )}
                    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
            </nav>

            <div className="content-wrapper">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/venues" element={<ProtectedRoute><VenueListPage /></ProtectedRoute>} />
                    <Route path="/venues/:id" element={<ProtectedRoute><VenueDetailPage /></ProtectedRoute>} />
                    <Route path="/vendors" element={<ProtectedRoute><VendorListPage /></ProtectedRoute>} />
                    <Route path="/vendors/:id" element={<ProtectedRoute><VendorDetailPage /></ProtectedRoute>} />
                    <Route path="/events" element={<ProtectedRoute><EventListPage /></ProtectedRoute>} />
                    <Route path="/events/:id" element={<ProtectedRoute><EventDetailPage /></ProtectedRoute>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
