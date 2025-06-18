import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Supabase Auth Error:", error.message);
      } else {
        setUser(data?.user);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      setUser(null);
      navigate("/login"); // redirect after logout
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Character Creator</h2>
      <div className="navbar__links">
        {!user ? (
          <Link to="/login" className="link">Login</Link>
        ) : (
          <>
            <Link to="/create-character" className="link">Create Character</Link>
            <Link to="/my-characters" className="link">My Characters</Link>
            <button onClick={handleLogout} className="link logout-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
