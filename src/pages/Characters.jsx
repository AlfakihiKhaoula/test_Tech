import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import { getFavorites } from "../utils/localStorage";
import Title from "../components/Title";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null); 
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
  });

  useEffect(() => {
    const query = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}&${query.toString()}`
        );

        const { results, info } = response.data;
        const favorites = getFavorites();

        const favoriteCharacters = results.filter((char) =>
          favorites.includes(char.id)
        );
        const nonFavoriteCharacters = results.filter(
          (char) => !favorites.includes(char.id)
        );

        setCharacters([...favoriteCharacters, ...nonFavoriteCharacters]);
        setInfo(info); 
      } catch (error) {
        setCharacters([]);
        setInfo(null);
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, [page, filter]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1); 
  };

  return (
    <div className="px-4 py-8">
      <Title title={"Rick & Morty Characters"} />

      
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          onChange={handleOnchange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="status"
          placeholder="Search by status"
          onChange={handleOnchange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="species"
          placeholder="Search by species"
          onChange={handleOnchange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="gender"
          placeholder="Search by gender"
          onChange={handleOnchange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      
      <div className="grid grid-cols-12 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      
      {info && (
        <div className="mt-12 flex justify-center items-center gap-6">
          <button
            disabled={!info.prev}
            className={`px-5 py-2 rounded-lg transition text-white ${
              info.prev ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Previous
          </button>
          <span className="text-xl font-semibold">Page {page}</span>
          <button
            disabled={!info.next}
            className={`px-5 py-2 rounded-lg transition text-white ${
              info.next ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
