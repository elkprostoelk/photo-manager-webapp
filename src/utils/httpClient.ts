import axios from 'axios';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

httpClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default httpClient;