import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './HomePage.css';

function HomePage() {
    const [venues, setVenues] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const [venuesRes, vendorsRes, eventsRes] = await Promise.all([
                    api.get('/venues', { headers }),
                    api.get('/vendors', { headers }),
                    api.get('/events', { headers })
                ]);

                setVenues(venuesRes.data.slice(0, 3));  // Show top 3 venues
                setVendors(vendorsRes.data.slice(0, 3));  // Show top 3 vendors
                setEvents(eventsRes.data.slice(0, 3));   // Show top 3 events
            } catch (error) {
                console.error('Error fetching home page data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-heading">Plan Your Perfect Event </h1>
                <p className="hero-subheading">Discover stunning venues, trusted vendors & exciting events!</p>
            </div>

            <section className="home-section">
                <h2> Featured Venues</h2>
                <div className="home-cards">
                    {venues.length > 0 ? venues.map(venue => (
                        <Link to={`/venues/${venue.id}`} key={venue.id} className="home-card">
                            <img 
                                src={`${process.env.PUBLIC_URL}/images/venues/${venue.photo_url}`} 
                                alt={venue.name} 
                                className="home-card-image"
                            />
                            <h3>{venue.name}</h3>
                            <p>{venue.location}</p>
                        </Link>
                    )) : <p>No venues available.</p>}
                </div>
            </section>

            <section className="home-section">
                <h2> Top Vendors</h2>
                <div className="home-cards">
                    {vendors.length > 0 ? vendors.map(vendor => (
                        <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="home-card">
                            <img 
                                src={`${process.env.PUBLIC_URL}/images/vendors/${vendor.photo_url}`} 
                                alt={vendor.name} 
                                className="home-card-image"
                            />
                            <h3>{vendor.name}</h3>
                            <p>{vendor.service_type}</p>
                        </Link>
                    )) : <p>No vendors listed yet.</p>}
                </div>
            </section>

            <section className="home-section">
                <h2> Upcoming Events</h2>
                <div className="home-cards">
                    {events.length > 0 ? events.map(event => (
                        <Link to={`/events/${event.id}`} key={event.id} className="home-card">
                            <h3>{event.event_name}</h3>
                            <p>{new Date(event.event_date).toLocaleDateString()}</p>
                            <p>{event.event_type}</p>
                        </Link>
                    )) : <p>No upcoming events at the moment.</p>}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
