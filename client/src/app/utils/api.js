const { default: axios } = require("axios");

const BASE_URI = "http://localhost:5050/api/v1";

const api = axios.create({
  baseURL: BASE_URI,
  withCredentials: true,
});

export const addBusiness = async (data) => {
  const token = localStorage.getItem("token");

  api.post(`${BASE_URI}/businesses`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getQrMenu = async (slug) =>
  await api.get(`${BASE_URI}/businesses/qr/${slug}`);

export const register = async (formData) => {
  const token = localStorage.getItem("token");

  return await api.post("/businesses", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCategories = async (id) => {
  const token = localStorage.getItem("token");
  return await api.get(`${BASE_URI}/items/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addNewCategory = async (data) => {
  const token = localStorage.getItem("token");

  return await api.post(`${BASE_URI}/categories`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = async (categoryId, data) => {
  return await axios.patch(`${BASE_URI}/categories/${categoryId}`, data);
};

export const addNewProduct = async (data) => {
  const token = localStorage.getItem("token");

  return await api.post(`${BASE_URI}/items`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");

  return await api.delete(`${BASE_URI}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyQr = async () => {
  const token = localStorage.getItem("token");

  return await api.get(`${BASE_URI}/businesses/getMyQr`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProducts = async (id) => {
  const token = localStorage.getItem("token");
  return await api.get(`${BASE_URI}/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPublished = async (id) => {
  const token = localStorage.getItem("token");
  return await api.get(`${BASE_URI}/businesses/publish/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateItem = (itemId, updatedData) => {
  return axios.patch(`${BASE_URI}/items/${itemId}`, updatedData);
};

export const deleteItemById = (itemId) => {
  return axios.delete(`${BASE_URI}/items/${itemId}`);
};
