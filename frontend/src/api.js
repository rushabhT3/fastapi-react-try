import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchMessage = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};
