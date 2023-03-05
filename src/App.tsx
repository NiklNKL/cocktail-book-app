import { Box, Button, Grid } from "@mui/material";
import AppAppBar from "./components/AppAppBar";
import Images from "./components/BilderKarussel/Images";
import FilterDrawer from "./components/FilterDrawer";

function App() {
  return (
    <Box height="100vh">
      <AppAppBar />
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

export default App;
