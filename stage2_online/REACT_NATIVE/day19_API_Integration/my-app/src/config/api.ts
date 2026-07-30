import axios from "axios";
import { Platform } from "react-native";

const PORT = 3000;

const Local_IP = "10.59.111.108";

const BASE_URL = Platform.select({
  android: `http://10.0.2.2:${PORT}`,
  default: `http://${Local_IP}:${PORT}`,
});

export const api = axios.create({
  baseURL: Platform.OS === "android" ? `http://${Local_IP}:${PORT}` : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("Base URL Aktif:", api.defaults.baseURL);

export default api;
