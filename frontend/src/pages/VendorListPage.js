import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function VendorListPage() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/vendors', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
                setError('Failed to load vendors.');
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    if (loading) return <p>Loading vendors...</p>;
    if (error) return <p>{error}</p>;
    if (vendors.length === 0) return <p>No vendors available.</p>;

    return (
        <div className="page-container">
            <h1 className="page-heading">Our Trusted Vendors</h1>
            <div className="card-container">
                {vendors.map(vendor => (
                    <div key={vendor.id} className="card">
                        <h3>{vendor.name}</h3>
                        <p>{vendor.service}</p>
                        <button onClick={() => navigate(`/vendors/${vendor.id}`)}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VendorListPage;
