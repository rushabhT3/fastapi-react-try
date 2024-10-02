import React, { useState } from "react";

import { addAnimal } from "./api";

const AddAnimalForm = ({ token, fetchAnimals }) => {
  const [newAnimal, setNewAnimal] = useState({ name: "", species: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAnimal(newAnimal, token);
      setNewAnimal({ name: "", species: "" });
      fetchAnimals();
    } catch (err) {
      setError("An error occurred while adding the animal");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-bold mb-4">Add New Animal</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
  );
};

export default AddAnimalForm;