import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import CreateCharacter from "./pages/CreateCharacter";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-character" element={<CreateCharacter />} />
      </Routes>
    </>
  );
};

export default App;
