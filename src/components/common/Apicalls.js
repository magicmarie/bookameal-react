import axios from "axios";

//get token from localstorage to be used on all routes once logged in
// append the baseURL and headers
const axiosInstance = axios.create({
  baseURL: "https://book-a-meal-api-db.herokuapp.com/api/v1",
  headers: { token: `${localStorage.getItem("token")}` }
});

axiosInstance.interceptors.request.use(config => {
  // if token exists in localstorage but headers.token is empty, add the the token to it
  if (localStorage.getItem("token") && config.headers.token === "null") {
    config.headers.token = `${localStorage.getItem("token")}`;
  }
  return config;
});

export default axiosInstance;
