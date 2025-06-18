import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabaseClient";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import MyCharacters from "./pages/MyCharacters";
import CreateCharacter from "./pages/CreateCharacter";

const App = () => {
  const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("App - Checking user session:", data?.user);

      if (error) {
        console.error("Session Error:", error.message);
      }

      setUser(data?.user);
      setLoading(false);
    };

    checkSession();
  }, []);

return (
  <>
    <Navbar />
    {loading ? (
      <p>Loading...</p>
    ) : (
      <Routes>
        {/* ✅ Route logic will only run after loading finishes */}
        <Route path="/" element={user ? <Navigate to="/my-characters" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-characters" element={user ? <MyCharacters /> : <Navigate to="/login" />} />
        <Route path="/create-character" element={user ? <CreateCharacter /> : <Navigate to="/login" />} />
      </Routes>
    )}
  </>
);

};

export default App;
