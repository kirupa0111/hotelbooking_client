import axios from "axios";
const token = localStorage.getItem("token");
console.log(token);
const axiosInstance = axios.create({
  baseURL: "https://hotelbooking-server.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
