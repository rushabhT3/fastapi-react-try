import React from "react";
import { Heart } from "lucide-react";

const AnimalCard = ({ animal, isFavorite, toggleFavorite }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-semibold">{animal.name}</h3>
      <p className="text-gray-600">{animal.species}</p>
    </div>
    <button
      onClick={() => toggleFavorite(animal.id)}
      className="focus:outline-none"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={24}
        className={`transition-colors duration-300 ${
          isFavorite ? "text-red-500 fill-current" : "text-gray-400"
        }`}
      />
    </button>
  </div>
);

const AnimalList = ({ animals, favoriteAnimals, toggleFavorite, error }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">All Animals</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            isFavorite={favoriteAnimals.some((fav) => fav.id === animal.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

const FavoriteAnimalList = ({ favoriteAnimals, toggleFavorite, error }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Favorite Animals</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {favoriteAnimals.length === 0 ? (
        <p className="text-gray-600">
          You haven't added any favorite animals yet.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favoriteAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { AnimalList, FavoriteAnimalList };