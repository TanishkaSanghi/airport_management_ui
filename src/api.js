import axios from "axios";

const api = axios.create({
  baseURL: "https://3.6.57.247.sslip.io",
});

export default api;