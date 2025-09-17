import axios from 'axios';

const client = axios.create({
  // Prefix all API calls with /api; CRA proxy forwards to backend
  baseURL: '/api'
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;


