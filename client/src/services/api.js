import axios from 'axios';

/**
 * Axios Instance
 * 
 * Pre-configured axios instance for making API requests.
 * Base URL determines where to send requests (Localhost 5000 for now).
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request Interceptor: Attach Token to every request if it exists
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authAPI = {
    login: (credentials) => apiClient.post('/users/login', credentials),
    register: (userData) => apiClient.post('/users', userData),
    getCurrentUser: () => apiClient.get('/users/me'),
};

export const courseAPI = {
    getAll: () => apiClient.get('/courses'),
    getById: (id) => apiClient.get(`/courses/${id}`),
    create: (courseData) => apiClient.post('/courses', courseData),
    updateVideoStatus: (courseId, videoId, data) => apiClient.put(`/courses/${courseId}/videos/${videoId}`, data),
};

export default apiClient;
