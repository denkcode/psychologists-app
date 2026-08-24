import { Routes, Route } from "react-router-dom";
import { Psychologists } from "./components/Psychologists/Psychologists";
import { Home } from "./components/Home/Home";
import { Favorites } from "./components/Favorites/Favorites";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
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
