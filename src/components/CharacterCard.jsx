import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { getFavorites, toggleFavorites } from "../utils/localStorage";
import { useEffect, useState } from "react";

export default function CharacterCard({
  character,
  isInFavoritesPage = false,
  onRemoveFavorite,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fav = getFavorites();
    setIsFavorite(fav.includes(character.id));
  }, [character.id]);

  const handleFavorite = () => {
    const updatedFavorite = toggleFavorites(character.id);
    const currentlyFavorite = updatedFavorite.includes(character.id);
    setIsFavorite(currentlyFavorite);

    if (isInFavoritesPage && !currentlyFavorite && onRemoveFavorite) {
      onRemoveFavorite(character.id);
    }
  };

  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-3 relative bg-white dark:bg-zinc-900 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative  overflow-hidden">
        <Link to={`/character/${character.id}`}>
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button className="absolute top-3 right-3 text-red-500 text-xl z-10 hover:scale-110 transition-transform bg-white rounded-full p-3">
          {isInFavoritesPage ? (
            <FaHeart
              className=" text-red-500 cursor-pointer "
              onClick={handleFavorite}
            />
          ) : isFavorite ? (
            <FaHeart className=" text-red-500" />
          ) : (
            <CiHeart
              className=" text-red-500 cursor-pointer "
              onClick={handleFavorite}
            />
          )}
        </button>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70  to-transparent text-white p-3">
          <h3 className="text-lg font-semibold">{character.name}</h3>
        </div>
      </div>
      <div className="p-4 text-zinc-800 dark:text-zinc-200">
        <p className="text-sm">
          <span className="font-medium">Status:</span> {character.status}
        </p>
        <p className="text-sm">
          <span className="font-medium">Species:</span> {character.species}
        </p>
        <p className="text-sm">
          <span className="font-medium">Gender:</span> {character.gender}
        </p>
      </div>
    </div>
  );
}
