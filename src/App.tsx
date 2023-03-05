import CocktailList from "./components/Pages/RandomCocktailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import IngredientsPage from "./components/Pages/IngredientsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/allcocktails" element={<CocktailList />} />
      <Route path="/ingredients" element={<IngredientsPage />} />
    </Routes>
  );
}

export default App;
