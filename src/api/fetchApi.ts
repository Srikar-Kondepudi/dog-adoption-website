import axios from "axios";
import type { Dog } from "../types";

const api = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true,
});

export default api; 