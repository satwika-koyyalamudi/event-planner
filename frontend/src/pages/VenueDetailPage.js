import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import './VenueDetailPage.css';

function VenueDetailPage() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/venues/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVenue(response.data);
            } catch (error) {
                console.error('Error fetching venue:', error);
                setError('Failed to load venue details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVenue();
        }
    }, [id]);

    const handleAddToCart = () => {
        setMessage("✅ Added to Cart!");
        setTimeout(() => setMessage(""), 2000);
    };

    const handleBookNow = () => {
        setMessage("🎉 Booked Successfully!");
        setTimeout(() => setMessage(""), 2000);
    };

    if (loading) return <p className="loading-text">Loading venue details...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!venue) return <p className="error-text">Venue not found.</p>;

    return (
        <div className="venue-detail-container">
            <h2 className="venue-title">{venue.name}</h2>

            <div className="venue-image-wrapper">
                <img 
                    src={venue.photo_url ? `${process.env.PUBLIC_URL}/images/venues/${venue.photo_url}` : `${process.env.PUBLIC_URL}/images/venues/default.jpg`} 
                    alt={venue.name} 
                    className="venue-image"
                />
            </div>

            <div className="venue-info">
                <p><strong>Description:</strong> Suitable for any type of event</p>
                <p><strong>Location:</strong> {venue.location}</p>
                <p><strong>Price Range:</strong> {venue.price_range}</p>
                <p><strong>Styles:</strong> {venue.theme_tags}</p>
                <p><strong>Capacity:</strong> {venue.capacity}</p>
            </div>

            <div className="venue-buttons">
                <button className="auth-button" onClick={handleAddToCart}>Add to Cart</button>
                <button className="auth-button" onClick={handleBookNow}>Book Now</button>
            </div>

            {message && <p className="success-message">{message}</p>}
        </div>
    );
}

export default VenueDetailPage;
