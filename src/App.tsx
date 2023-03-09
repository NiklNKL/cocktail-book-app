import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import DrinkPage from "./components/Pages/DrinkPage";
import IngredientsPage from "./components/Pages/IngredientsPage";
import SearchResults from "./components/Pages/SearchResults";
import FavouritesPage from "./components/Pages/FavouritesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cocktail/:id" element={<DrinkPage />} />
      <Route path="/ingredients" element={<IngredientsPage />} />
      <Route path="/search-results/:query" element={<SearchResults />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}

export default App;
