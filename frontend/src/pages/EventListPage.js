import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

function EventListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Please log in.');
                    setLoading(false);
                    return;
                }

                const response = await api.get('/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(response.data);
            } catch (err) {
                console.error('Error fetching events:', err);
                if (err.response?.status === 403) {
                    setError('Access denied. Please check your login or permissions.');
                } else {
                    setError('Failed to load events.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>{error}</p>;
    if (events.length === 0) return <p>No events available.</p>;

    return (
        <div className="page-container">
            <h1 className="page-heading">Upcoming Events</h1>
            <div className="card-container">
                {events.map(event => (
                    <div key={event.id} className="card">
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/events/${event.photo_url}`} 
                            alt={event.event_type} 
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h3>{event.event_name}</h3>
                        <p>Type: {event.event_type}</p>
                        <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
                        <Link to={`/events/${event.id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventListPage;
