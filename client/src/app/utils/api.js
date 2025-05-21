const { default: axios } = require("axios");

const BASE_URI = "http://localhost:5050/api/v1";

const api = axios.create({
  baseURL: BASE_URI,
  withCredentials: true,
});

export const addBusiness = async (data) =>
  api.post(`${BASE_URI}/businesses`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getQrMenu = async (slug) =>
  await api.get(`${BASE_URI}/businesses/qr/${slug}`);

export const register = async (formData) =>
  await api.post("/businesses", formData);
