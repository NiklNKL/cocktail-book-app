import { Box } from "@mui/material";
import AppBarElement from "../AppBarElement";
import Images from "../BilderKarussel/Images";
import FilterDrawer from "../FilterDrawer";
import ParallexEffect from "../BilderKarussel/Imagecarussel2";

function HomePage() {
  return (
    <Box height="100vh">
      <AppBarElement />
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        paddingTop={"auto"}
      >
        <Images />
        {/* <ParallexEffect /> */}
      </Box>
      <FilterDrawer />
    </Box>
  );
}

export default HomePage;
