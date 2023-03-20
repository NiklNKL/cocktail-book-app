import { Box } from "@mui/material";
import AppBarElementNoSearch from "../AppBarNoSearch/AppBarElementNoSearch";
import Images from "./FavPageComponents/ImagesFav";
import FilterDrawer from "../FilterDrawer";

function FavouritesPage() {
  return (
    <Box height="100vh">
      <AppBarElementNoSearch />
      <Images />
      <FilterDrawer />
    </Box>
  );
}

export default FavouritesPage;
