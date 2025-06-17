import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
 // Adjust the import path as necessary

const Navbar = () => {
  const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };

    getUser();
  }, []);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Character Creator</h2>
      <div style={styles.links}>
        {!user ? (
          <Link to="/login" style={styles.link}>Login</Link>
        ) : (
          <>
            <Link to="/create-character" style={styles.link}>Create Character</Link>
            <Link to="/my-characters" style={styles.link}>My Characters</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "#fff" },
  logo: { margin: "0" },
  links: { display: "flex", gap: "1rem" },
  link: { color: "#fff", textDecoration: "none", fontSize: "1.2rem" }
};

export default Navbar;
