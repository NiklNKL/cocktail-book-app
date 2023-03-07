import { AppBar, Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import AppBarElement from "../AppBar/AppBarElement";
import { useDrinks } from "../BilderKarussel/ImageServer";
import axios from "axios";

export default function DrinkPage({ id }: { id: string }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.smartinies.recipes/detail?cocktailID=${id}`
        );
        //await new Promise((resolve) => setTimeout(resolve, 5000));
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Box height="100vh">
      <AppBarElement />
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        marginTop="200px"
      >
        <h1>{data}</h1>
      </Box>
    </Box>
  );
}
