import axios from 'axios';
import Cookies from 'js-cookie';

// 🚀 DEPLOYMENT CHANGE: API Base URL Configuration
// NOTE: Change only this value during deployment.
// For PRODUCTION, set to your live backend URL (e.g., https://api.dezignshark.com)
// For LOCAL, switch to: http://localhost:8084
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

http.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.message === 'Network Error') {
      alert('Network Error');
    } else if (err.response.status === 401) {
      Cookies.remove('access_token');
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);
