import axios from "axios";
import { TokenService } from "./token.service";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://89.219.23.53:7070/api",
  withCredentials: true,
=======
  baseURL: "/api"
});

axiosInstance.interceptors.request.use(function (config) {
  const token = TokenService.getToken();
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
>>>>>>> 0986afb2ba50c950543fdea7c24a1162775dca9c
});

export { axiosInstance as axios };
