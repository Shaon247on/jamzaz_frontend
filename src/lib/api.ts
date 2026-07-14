/**
 * Axios Instance Configuration
 * Central API client with interceptors for token management and error handling
 */

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const statusCode = error.response?.status;

    // if (statusCode === 401) {
    //   // Token expired or unauthorized
    //   if (typeof window !== "undefined") {
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("refreshToken");
    //     window.location.href = "/login";
    //   }
    //   console.error("Session expired. Please login again.");
    // } else if (statusCode === 403) {
    //   console.error("You do not have permission to access this resource.");
    // } else if (statusCode === 404) {
    //   console.error("Resource not found.");
    // } else if (statusCode && statusCode >= 500) {
    //   console.error("Server error. Please try again later.");
    // } else if (error.message === "Network Error") {
    //   console.error("Network error. Please check your connection.");
    // } else {
    //   const errorMessage =
    //     (error.response?.data as { message?: string })?.message ||
    //     "An error occurred";
    //   console.error(errorMessage);
    // }

    return Promise.reject(error);
  },
);

export default axiosInstance;
