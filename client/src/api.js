import axios from 'axios';

const api = axios.create({
    baseURL: "/", // proxy will forward to backend
    withCredentials: true
});

export default api;
