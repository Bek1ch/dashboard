import axios from "axios";
import { TokenService } from "./token.service";

const axiosInstance = axios.create({
  baseURL: "http://89.219.23.53/api",
});

axiosInstance.interceptors.request.use(function (config) {
  const token = TokenService.getToken();
  if (!token) return config;
  config.headers.Authorization = `Basic ${token}`;

  return config;
});

export { axiosInstance as axios };
