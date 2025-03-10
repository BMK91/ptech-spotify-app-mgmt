import axios from "axios";

// Create an Axios instance with a predefined base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Set your base URL for all requests (change accordingly)
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json", // Default headers for all requests
  },
});

// Optional: Interceptors to handle requests/responses globally
api.interceptors.request.use(
  (config) => {
    // If you have a token, you can add it to headers for authorization here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if unauthorized (token expired or invalid)
      // For example, redirect to login page
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
