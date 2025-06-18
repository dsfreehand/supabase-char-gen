import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import type { Character } from "../models/types";

const MyCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setError("Failed to fetch user.");
        setLoading(false);
        return;
      }
      setUserId(data.user.id);
    };

    fetchUser();
  }, []);

  // Fetch characters for current user
  useEffect(() => {
    if (!userId) return;

    const fetchCharacters = async () => {
      setLoading(true);
      const { data: charactersData, error } = await supabase
        .from("characters")
        .select("*")
        .eq("user_id", userId);

      console.log("Characters fetched from Supabase:", charactersData);

      if (error) {
        setError("Failed to fetch characters.");
        setCharacters([]);
      } else {
        setCharacters(charactersData || []);
      }

      setLoading(false);
    };

    fetchCharacters();
  }, [userId]);

  const handleDeleteCharacter = async (id: string) => {
    const { error } = await supabase.from("characters").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete character:", error.message);
    } else {
      setCharacters((prev) => prev.filter((char) => char.id !== id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Characters</h1>
      {characters.length === 0 ? (
        <p>No characters found. Create one!</p>
      ) : (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <h2>{character.name}</h2>
              <p>Race: {character.race}</p>
              <p>Class: {character.class}</p>
              <p>Level: {character.level}</p>
              <p>Traits: {character.traits}</p>
              <button onClick={() => handleDeleteCharacter(character.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCharacters;
