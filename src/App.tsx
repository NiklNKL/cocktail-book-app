import CocktailList from "./components/Pages/CocktailList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import DrinkPage from "./components/Pages/DrinkPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/allcocktails" element={<CocktailList />} />
      <Route
        path="/cocktail/:name"
        element={<DrinkPage name={window.location.pathname.split("/")[2]} />}
      />
    </Routes>
  );
}

export default App;
