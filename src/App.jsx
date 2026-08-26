import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Psychologists } from "./components/Psychologists/Psychologists";
import { Home } from "./components/Home/Home";
import { Favorites } from "./components/Favorites/Favorites";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Header } from "./components/Header/Header";

import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [authMode, setAuthMode] = useState("login");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "green",
  );

  const handleOpenLogin = () => {
    setIsOpen(true);
    setAuthMode("login");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const themeClass =
    theme === "blue" ? "theme-blue" : theme === "orange" ? "theme-orange" : "";

  return (
    <div className={themeClass}>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
        onThemeChange={handleThemeChange}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
