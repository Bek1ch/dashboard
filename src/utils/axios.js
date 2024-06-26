import axios from "axios";
import { TokenService } from "./token.service";

const axiosInstance = axios.create({
  baseURL: " http://10.60.5.9/api",
});

axiosInstance.interceptors.request.use(function (config) {
  const token = TokenService.getToken();
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export { axiosInstance as axios };
