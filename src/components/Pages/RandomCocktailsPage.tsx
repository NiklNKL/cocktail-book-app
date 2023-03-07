import { Box, Toolbar } from "@mui/material";
import AppBarElement from "../AppBar/AppBarElement";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageListForDrinks from "../ImageListForDrinks";

function CocktailList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.smartinies.recipes/random_list?startAt=0&numResults=5"
        );
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
      <Toolbar />
      <ImageListForDrinks data={data} type="cocktail" />
    </Box>
  );
}

export default CocktailList;
