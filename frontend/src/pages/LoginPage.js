import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });  // Correct endpoint
            localStorage.setItem('token', response.data.token);  // Save JWT token
            navigate('/home');  // Redirect to HomePage
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    required
                />
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
