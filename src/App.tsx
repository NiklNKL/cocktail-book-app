import { AppBar, Box, Button, Grid } from "@mui/material";
import SignInSide from "./components/SideBar";
import MenuAppBar from "./AppBar/AppBar";
import Images from "./components/BilderKarussel/Images";
import AppBarElement from "./components/AppBarElement";
function App() {
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
    </Box>
  );
}

export default App;
