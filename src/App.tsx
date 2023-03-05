import CocktailList from "./components/Pages/CocktailList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/allcocktails" element={<CocktailList />} />
    </Routes>
  );
}

export default App;
