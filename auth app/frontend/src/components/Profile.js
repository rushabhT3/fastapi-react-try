import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";

const API_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ name: "", species: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      fetchAnimals();
    }
  }, [token, navigate]);

  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`${API_URL}/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnimals(response.data);
    } catch (err) {
      setError("An error occurred while fetching animals");
    }
  };

  const handleInputChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/animals`, newAnimal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewAnimal({ name: "", species: "" });
      fetchAnimals();
    } catch (err) {
      setError("An error occurred while adding the animal");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <header className="bg-white shadow-md rounded mb-4 p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Profile Page</h1>
          <div className="flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <Logout />
          </div>
        </header>

        <main>
          <section>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2 className="text-xl font-bold mb-4">Add New Animal</h2>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  value={newAnimal.name}
                  onChange={handleInputChange}
                  placeholder="Animal Name"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="species"
                  value={newAnimal.species}
                  onChange={handleInputChange}
                  placeholder="Species"
                  required
                />
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Animal
              </button>
            </form>

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-xl font-bold mb-4">All Animals</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <ul>
                {animals.map((animal) => (
                  <li key={animal.id} className="mb-2">
                    Name: {animal.name} - Species: {animal.species}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Profile;
