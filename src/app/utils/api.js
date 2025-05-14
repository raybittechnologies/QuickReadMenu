const { default: axios } = require("axios");

const BASE_URI = "http://192.168.100.26:5050/api/v1";

const api = axios.create({
  baseURL: BASE_URI,
  withCredentials: true,
});

export const addBusiness = async (data) =>
  api.post(`${BASE_URI}/businesses`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
