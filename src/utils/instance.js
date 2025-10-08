import axios from "axios";
const token = localStorage.getItem("token");
console.log(token);
const axiosInstance = axios.create({
  baseURL: "https://hotelbooking-server.onrender.com/api",
  // baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
