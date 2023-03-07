import { AppBar, Box, Button, Grid } from "@mui/material";
import AppBarElement from "../AppBar/AppBarElement";
import { useDrinks } from "../BilderKarussel/ImageServer";

export default function DrinkPage({ name }: { name: string }) {
  return (
    <Box height="100vh">
      <AppBarElement />
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        marginTop="200px"
      >
        <h1>{name.replace("%20", " ")}</h1>
      </Box>
    </Box>
  );
}
