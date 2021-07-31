import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
// const baseURL = "https://events-trolley.herokuapp.com";
const baseURL = "http://localhost:3000";

const axiosConfig = {
  baseURL: baseURL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
};
const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const successMessage = response.data.msg;
    if (response.status && response.status === 200) {
      Message.success({
        message: successMessage,
      });
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  function(error) {
    const response = error.response;
    const errorMessage = response.data.msg;
    if (response.status && response.status === 401) {
      Message.error({
        message: errorMessage,
      });
      router.push({ path: "/" });
    }
    if (response.status && response.status === 403) {
      Message.error({
        message: "Session Expired. Please login again",
      });
      router.push({ path: "/" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
