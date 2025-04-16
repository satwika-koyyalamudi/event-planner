import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import './VendorDetailPage.css';

function VendorDetailPage() {
    const { id } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/vendors/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVendor(response.data);
            } catch (error) {
                console.error('Error fetching vendor:', error);
                setError('Failed to load vendor details.');
            } finally {
                setLoading(false);
            }
        };
        fetchVendor();
    }, [id]);

    if (loading) return <p className="loading-text">Loading vendor details...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!vendor) return <p className="error-text">No vendor found.</p>;

    return (
        <div className="vendor-detail-container">
            <h2 className="vendor-title">{vendor.name}</h2>

            <div className="vendor-image-wrapper">
                <img 
                    src={`/images/vendors/${vendor.photo_url}`} 
                    alt={vendor.name} 
                    className="vendor-image"
                />
            </div>

            <div className="vendor-info">
                <p><strong>Service:</strong> {vendor.service_type}</p>
                <p><strong>Description:</strong> Can service any type of event.</p>
                <p><strong>Location:</strong> {vendor.location}</p>
                <p><strong>Price Range:</strong> {vendor.price_range}</p>
                <p><strong>Styles:</strong> {vendor.theme_tags}</p>
            </div>

            <div className="vendor-buttons">
                <button className="auth-button">Add to Cart</button>
                <button className="auth-button">Book Now</button>
            </div>
        </div>
    );
}

export default VendorDetailPage;
