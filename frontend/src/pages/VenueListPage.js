import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function VenueListPage() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/venues', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVenues(response.data);
            } catch (error) {
                console.error('Error fetching venues:', error);
                setError('Failed to load venues.');
            } finally {
                setLoading(false);
            }
        };
        fetchVenues();
    }, []);

    if (loading) return <p>Loading venues...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="page-container">
            <h1 className="page-heading">Available Venues</h1>
            <div className="card-container">
                {venues.map(venue => (
                    <div key={venue.id} className="card">
                         <img 
                            src={`${process.env.PUBLIC_URL}/images/venues/${venue.photo_url}`} 
                            alt={venue.name} 
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h3>{venue.name}</h3>
                        <p>{venue.location}</p>
                        <button onClick={() => navigate(`/venues/${venue.id}`)}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VenueListPage;
