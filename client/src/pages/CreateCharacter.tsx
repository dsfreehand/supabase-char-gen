import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const CreateCharacter = () => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [charClass, setCharClass] = useState("");
  const [level, setLevel] = useState(1);
  const [traits, setTraits] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting character with user_id:", userId);


    if (!userId) return;

    const { error } = await supabase.from("characters").insert([
      {
        user_id: userId,
        name,
        race,
        class: charClass,
        level,
        traits,
      },
    ]);

    if (error) {
      console.error("❌ Error creating character:", error.message);
    } else {
      navigate("/my-characters");
    }
  };

  return (
    <div>
      <h1>Create a Character</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Character Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Race" value={race} onChange={(e) => setRace(e.target.value)} required />
        <input type="text" placeholder="Class" value={charClass} onChange={(e) => setCharClass(e.target.value)} required />
        <input type="number" placeholder="Level" value={level} onChange={(e) => setLevel(Number(e.target.value))} required />
        <textarea placeholder="Traits" value={traits} onChange={(e) => setTraits(e.target.value)} />
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CreateCharacter;
