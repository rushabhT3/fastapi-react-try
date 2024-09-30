import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchItems = async () => {
  const response = await axios.get(`${API_URL}/items/`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(`${API_URL}/items/`, item);
  return response.data;
};

export const fetchItemById = async (id) => {
  const response = await axios.get(`${API_URL}/items/${id}`);
  return response.data;
};