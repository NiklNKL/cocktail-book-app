import { Box, Grid, makeStyles, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AppBarElementNoSearch from "../AppBarNoSearch/AppBarElementNoSearch";

import axios from "axios";

interface IngredientGridProps {
  ingredientImage: string[];
  ingredient: string[];
  ingredientMeasure: string[];
}

const IngredientGrid: React.FC<IngredientGridProps> = ({
  ingredientImage,
  ingredient,
  ingredientMeasure,
}) => {
  return (
    <Grid container spacing={2}>
      {ingredientImage?.map((image, index) => (
        <Grid key={index} item xs={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={image}
              alt={ingredient[index]}
              style={{ width: "100%" }}
            />
            <Typography variant="subtitle1">
              {ingredient[index]} ({ingredientMeasure[index]})
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default function DrinkPage() {
  const [data, setData] = useState([]);

  const id = window.location.pathname.split("/").pop();

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

  console.log(data);

  console.log(id);
  return (
    <Box height="100vh">
      <AppBarElementNoSearch />
      <Box display="flex" marginTop="200px">
        <Box
          display="flex"
          marginLeft="50px"
          marginRight="50px"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <img style={{ borderRadius: "25px" }} src={data.cocktailImage} />
        </Box>
        <div>
          <Typography variant="h2">{data.cocktailName}</Typography>

          <Box marginTop="20px">
            <Box marginTop="20px" marginBottom="20px">
              <Typography variant="h4">Instructions:</Typography>
              <Typography variant="h5">{data.instructions}</Typography>
            </Box>
            <Box marginBottom="25px">
              <Typography variant="h4">Ingredients: </Typography>
              <IngredientGrid
                ingredientImage={data.ingredientImages}
                ingredient={data.ingredients}
                ingredientMeasure={data.ingredientMeasures}
              />
            </Box>
            <Typography variant="h5">Tags:</Typography>
            <Typography variant="h6">{data.tags}</Typography>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
