import { getToken, setToken } from "@/core/utils/functions";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(function (config) {
  // const token = getToken();
  // if (token) {
  //   config.headers["Authorization"] = `Bearer ${token}`;
  // }
  return config;
}, function (error) {
  return Promise.reject(error);
}); 

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, async (err) => {
  // const originalConfig = err.config;

  // if (originalConfig.url !== "/auth/login" && err.response) {
  //   // Access Token was expired
  //   if (err.response.status === 401 && !originalConfig._retry) {
  //     originalConfig._retry = true;

  //     try {
  //       const rs = await axiosInstance.post("/auth/refresh", {
  //         refreshToken: getToken(),
  //       });

  //       const { accessToken } = rs?.data?.authorization?.token;
  //       setToken(accessToken);
  //       axiosInstance.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${accessToken}`;
  //       return axiosInstance(originalConfig);
  //     } catch (_error) {
  //       return Promise.reject(_error);
  //     }
  //   }
  // }
  return Promise.reject(err);
});
export default axiosInstance