import { Routes, Route } from "react-router-dom"
import { Psychologists } from '../src/pages/Psychologists/Psychologists'
import { Home } from '../src/pages/Home/Home'
import { Favorites } from '../src/pages/Favorites/Favorites'
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/psychologists" element={<Psychologists />}></Route>
            <Route path="/favorites" element={ <Favorites />}></Route>
        </Routes>
    )
}

export default App
