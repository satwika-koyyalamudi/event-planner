import axios from 'axios';

const api = axios.create({
    baseURL: 'https://event-planner-zbux.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
