import { Box, Toolbar } from "@mui/material";
import AppBarElementNoSearch from "../AppBarNoSearch/AppBarElementNoSearch";
import IngredientImages from "./IngredientPageComponents/IngredientImages";

function Ingredients() {
  return (
    <Box>
      <AppBarElementNoSearch />
      <Toolbar />
      <IngredientImages />
    </Box>
  );
}

export default Ingredients;
