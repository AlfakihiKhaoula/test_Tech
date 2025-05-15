import axios from "axios";
import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { getFavorites } from "../utils/localStorage";
import Title from "../components/Title";

export default function Favorites() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const favorites = getFavorites();
    const fetchData = async () => {
      if (favorites.length === 0) {
        setCharacters([]);
        return;
      }

      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${favorites.toString()}`
      );

      // If only one favorite, the API returns an object instead of an array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setCharacters(data);
    };

    fetchData();
  }, []);

  // Handler to remove a character from local state
  const handleRemoveFavorite = (id) => {
    const updated = characters.filter((char) => char.id !== id);
    setCharacters(updated);
  };

  return (
    <div>
      <Title title={"Favorites characters"} />
      <div className="grid grid-cols-12 px-4 gap-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isInFavoritesPage
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
}
