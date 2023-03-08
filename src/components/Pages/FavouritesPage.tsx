import { Box } from "@mui/material";
import AppBarElement from "../AppBar/AppBarElement";
import Images from "./FavPageComponents/ImagesFav";
import FilterDrawer from "../FilterDrawer";

function FavouritesPage() {
  return (
    <Box height="100vh">
      <AppBarElement />

      <Images />

      <FilterDrawer />
    </Box>
  );
}

export default FavouritesPage;
