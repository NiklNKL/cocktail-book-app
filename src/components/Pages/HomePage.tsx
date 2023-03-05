import { Box } from "@mui/material";
import AppBarElement from "../AppBarElement";
import Images from "../BilderKarussel/Images";
import FilterDrawer from "../FilterDrawer";

function HomePage() {
  return (
    <Box height="100vh">
      <AppBarElement />
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        paddingTop={"100px"}
      >
        <Images />
      </Box>
      <FilterDrawer />
    </Box>
  );
}

export default HomePage;
