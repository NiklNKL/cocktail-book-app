import { Box, Button, Grid } from "@mui/material";
import SignInSide from "./components/SideBar";
import MenuAppBar from "./components/AppBar/AppBar";
import AppAppBar from "./components/AppAppBar";

function App() {
  return (
    <Box>
      <AppAppBar />
      <Box width={"100vh"} alignItems="center">
        <h1>Test</h1>
      </Box>
      <Button variant="contained">Test</Button>
    </Box>
  );
}

export default App;
