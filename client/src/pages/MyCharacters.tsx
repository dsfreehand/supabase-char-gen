import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import type { Character } from "../models/types";

const MyCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user.id);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchCharacters = async () => {
        const { data } = await supabase.from("characters").select("*").eq("user_id", user);
        setCharacters(data || []);
      };

      fetchCharacters();
    }
  }, [user]);
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCharacters;
