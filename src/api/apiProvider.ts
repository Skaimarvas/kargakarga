import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  async (response: any) => {
    if (response.data?.data?.token) {
      localStorage.setItem("token", response?.data.data.token);
    }

    return response;
  },
  async (error) => {
    const statusCode = error.response ? error.response.status : null;
    const detailMessage = error.response;
    console.log("In Response error", error);
    console.log("Error Status", statusCode);
  }
);

export default http;
