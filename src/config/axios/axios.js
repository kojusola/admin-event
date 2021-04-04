require("dotenv").config();
import axios from "axios";
import { Message } from "element-ui";
const baseURL = "https://events-trolley.herokuapp.com";

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
    const errorMessage = error.response.data.msg;
    Message.error({
      message: errorMessage,
    });
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use((response) => {
  const successMessage = response.data.msg;
  if (response.status === 200 || response.status === 201) {
    Message.success({
      message: successMessage,
    });
    return Promise.resolve(response);
  } else {
    const errorMessage = response.response.data.msg;
    Message.error({
      message: errorMessage,
    });
    return Promise.reject(response);
  }
});

export default axiosInstance;
