import { Box, Button, Grid } from "@mui/material";
import SignInSide from "./components/SideBar";
import MenuAppBar from "./components/AppBar/AppBar";
import AppAppBar from "./components/AppAppBar";
import Images from "./components/Images";
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
    </Box>
  );
}

export default App;
