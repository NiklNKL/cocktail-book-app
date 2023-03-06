import { Box, Toolbar } from "@mui/material";
import AppBarElement from "../AppBarElement";
import ImageListForDrinks from "../ImageListForDrinks";
import { useState, useEffect } from "react";
import axios from "axios";

function SearchResults() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pathName = window.location.pathname;
        const drinkName = pathName.split("/").pop();
        const response = await axios.get(
          `https://api.smartinies.recipes/list?contains=${drinkName}`
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
      <Toolbar />
      <ImageListForDrinks data={data} />
    </Box>
  );
}

export default SearchResults;
