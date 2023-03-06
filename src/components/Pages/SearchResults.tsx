import { Box, Toolbar } from "@mui/material";
import AppBarElement from "../AppBarElement";
import { useLocation } from "react-router-dom";
import ImageListForDrinks from "../ImageListForDrinks";

function SearchResults() {
  const { state } = useLocation();
  const { data } = state;

  return (
    <Box height="100vh">
      <AppBarElement />
      <Toolbar />
      <ImageListForDrinks data={data} />
    </Box>
  );
}

export default SearchResults;
