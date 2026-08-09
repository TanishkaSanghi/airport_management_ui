import axios from "axios";

const api = axios.create({
  baseURL: "http://3.6.57.247:8000",
});

export default api;