import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchAnimals = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/animals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw new Error("An error occurred while fetching animals");
  }
};

export const fetchFavoriteAnimals = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/favorite-animals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw new Error("An error occurred while fetching favorite animals");
  }
};

export const toggleFavorite = async (animalId, token, isFavorite) => {
  try {
    if (isFavorite) {
      await axios.delete(`${API_URL}/favorite-animal/${animalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(
        `${API_URL}/favorite-animal/${animalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (err) {
    throw new Error("An error occurred while updating favorites");
  }
};

export const addAnimal = async (newAnimal, token) => {
  try {
    await axios.post(`${API_URL}/animals`, newAnimal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    throw new Error("An error occurred while adding the animal");
  }
};
