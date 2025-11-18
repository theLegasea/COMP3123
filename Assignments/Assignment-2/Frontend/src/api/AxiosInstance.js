import axios from "axios";
// Citation
// https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

const BASE_URL = "http://localhost:8089/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // You can process the response data here if needed
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;