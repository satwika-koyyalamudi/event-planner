import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import './EventDetailPage.css';

function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/events/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return <p className="loading-text">Loading event details...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!event) return <p className="error-text">Event not found.</p>;

    return (
        <div className="event-detail-container">
            <h2 className="event-title">{event.event_name}</h2>

            <div className="event-image-wrapper">
                <img
                    src={event.photo_url ? `/images/events/${event.photo_url}` : '/images/events/default.jpg'}
                    alt={event.event_name}
                    className="event-image"
                />
            </div>

            <div className="event-info">
                <p><strong>Type:</strong> {event.event_type}</p>
                <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {event.description || "No description available."}</p>
            </div>

            <div className="event-buttons">
                <button className="auth-button">Add to Cart</button>
                <button className="auth-button">Book Now</button>
            </div>
        </div>
    );
}

export default EventDetailPage;
