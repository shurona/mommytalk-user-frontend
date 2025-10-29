import axios, { AxiosError, AxiosInstance } from 'axios';

// API Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ httpOnly Cookie를 자동으로 포함
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // ✅ httpOnly Cookie를 사용하므로 Authorization 헤더 불필요
    // 쿠키는 브라우저가 자동으로 포함시킴
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - Redirect to login
          // ✅ httpOnly Cookie는 서버가 자동으로 삭제
          // 로그인 페이지로 리다이렉트만 수행
          if (window.location.pathname !== '/' && window.location.pathname !== '/line-callback') {
            window.location.href = '/';
          }
          break;
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
