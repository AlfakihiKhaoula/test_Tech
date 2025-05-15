import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );

        setCharacter(response.data);
      } catch (error) {
        throw error("error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <p>loading</p>;
  }

  if (!character) {
    return <p>No character data found.</p>;
  }
  return (
    <div>
      <h1> Détails du personnage</h1>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={character.image}
            alt={character.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
          />
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span> {character.status}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Species:</span>{" "}
              {character.species}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Gender:</span> {character.gender}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Origin:</span>{" "}
              {character.origin.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span>{" "}
              {character.location.name}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {character.episode.map((ep) => (
              <li
                key={ep}
                className="bg-gray-100 rounded-lg px-4 py-2 shadow hover:shadow-md transition"
              >
                {ep}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
