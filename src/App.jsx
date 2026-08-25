import { Routes, Route } from "react-router-dom";
import { Psychologists } from "./components/Psychologists/Psychologists";
import { Home } from "./components/Home/Home";
import { Favorites } from "./components/Favorites/Favorites";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Header } from "./components/Header/Header";
import { useState } from "react";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const handleOpenLogin = () => {
    setIsOpen(true);
    setAuthMode("login");
  };
  return (
    <>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/psychologists"
          element={<Psychologists handleOpenLogin={handleOpenLogin} />}
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
