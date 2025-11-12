import axios from "axios";

const BOOK_BASE_URL = "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL: BOOK_BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
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