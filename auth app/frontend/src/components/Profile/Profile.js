// Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchAnimals, fetchFavoriteAnimals, toggleFavorite } from "./api";
import Header from "./Header";
import AddAnimalForm from "./AddAnimalForm";
import { AnimalList, FavoriteAnimalList } from "./AnimalList";

function Profile({ setToken }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [animals, setAnimals] = useState([]);
  const [favoriteAnimals, setFavoriteAnimals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      loadAnimals();
      loadFavoriteAnimals();
    }
  }, [token, navigate]);

  const loadAnimals = async () => {
    try {
      const data = await fetchAnimals(token);
      setAnimals(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadFavoriteAnimals = async () => {
    try {
      const data = await fetchFavoriteAnimals(token);
      setFavoriteAnimals(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleFavorite = async (animalId) => {
    try {
      // The `.some` method checks if at least one element in an array passes a specified test and returns `true` or `false`.
      const isFavorite = favoriteAnimals.some(
        (animal) => animal.id === animalId
      );
      await toggleFavorite(animalId, token, isFavorite);
      loadFavoriteAnimals();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <Header setToken={setToken} />
        <main>
          <section>
            <AddAnimalForm token={token} fetchAnimals={loadAnimals} />
            <AnimalList
              animals={animals}
              favoriteAnimals={favoriteAnimals}
              toggleFavorite={handleToggleFavorite}
              error={error}
            />
            <FavoriteAnimalList
              favoriteAnimals={favoriteAnimals}
              toggleFavorite={handleToggleFavorite}
              error={error}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Profile;
