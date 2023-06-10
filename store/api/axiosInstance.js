import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // timeout: 10000,
  headers: { "Content-Type": "application/json" }
});
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error?.response?.status === 401) {
    window.location.replace("/auth/login");
  }
  return Promise.reject(error);
});
export default axiosInstance