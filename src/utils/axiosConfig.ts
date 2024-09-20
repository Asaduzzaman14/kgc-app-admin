// src/utils/axiosConfig.js
import axios from 'axios';
import { baseAPi } from './api';
import { getKgcAdminToken } from '../hooks/handelAdminToken';
import { logout } from './auth';

const axiosInstance = axios.create({
  baseURL: `${baseAPi}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getKgcAdminToken();

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response);

    return response;
  },

  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
