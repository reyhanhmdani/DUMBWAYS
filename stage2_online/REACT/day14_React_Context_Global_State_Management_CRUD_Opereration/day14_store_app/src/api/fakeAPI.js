import axios from "axios";

export const api = axios.create({
  // kita pakai api public dari fakestore
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor menyisipkan token automatis jika ada di localstorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ambil token dari localStorage lalu simpan ke variable token
  if (token) {
    // kalau udah pernah login, atau tokenny ada
    config.headers.Authorization = `Bearer ${token}`; // kita masukkan bearer token ke header
  }
  return config; // lanjut ke server
});
