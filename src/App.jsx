import { Routes, Route } from "react-router-dom";
import { Psychologists } from "../src/pages/Psychologists/Psychologists";
import { Home } from "../src/pages/Home/Home";
import { Favorites } from "../src/pages/Favorites/Favorites";
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
