
import { Box, Grid, Typography } from "@mui/material";

import { useState, useEffect } from "react";
import AppBarElementNoSearch from "../AppBarNoSearch/AppBarElementNoSearch";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { Paper } from "@material-ui/core";
import Image from "../../bar_background.jpg";
import "../../../fonts/fonts.css";

interface IngredientGridProps {
  ingredientImage: string[];
  ingredient: string[];
  ingredientMeasure: string[];
}


interface Ingredient {
  cocktailImage: string;
  cocktailName: string;
  id: number;
  ingredientImages: [string];
  ingredientMeasures: [string];
  ingredients: [string];
  instructions: string;
  tags: [string];
}

const ingredientStyle: React.CSSProperties = {

  width: "40%",
  height: "40%",
  objectFit: "cover",
};

const IngredientGrid: React.FC<IngredientGridProps> = ({
  ingredientImage,
  ingredient,
  ingredientMeasure,
}) => {
  return (
    <Grid container spacing={2} marginTop="1%">
      {ingredientImage?.map((image, index) => (
        <Grid key={index} item xs={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={image} alt={ingredient[index]} style={ingredientStyle} />
            <Typography
              variant="subtitle1"
              color="white"
              fontFamily={"Gloria Hallelujah"}
            >
              {ingredient[index]} ({ingredientMeasure[index]})
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundAttachement: "fixed",
  },
};

const paperStyle = {
  paperContainer: {
    backgroundColor: grey[900] + "CA",
    minWidth: "fit-content",
    textAlign: "center",
    borderRadius: "20px",
  },
};

export default function DrinkPage() {
  const [data, setData] = useState<Ingredient>([]);

  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.smartinies.recipes/detail?cocktailID=${id}`
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Paper style={styles.paperContainer}>
      <Box height="100vh" marginBottom="2%">
        <AppBarElementNoSearch />
        <Box display="flex" marginTop="100px">
          <Box
            display="flex"
            marginLeft="2%"
            marginRight="2%"
            justifyContent="flex-start"
            alignItems="flex-start"
            marginTop="2%"
          >
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" style={paperStyle.paperContainer}>
                  <img
                    style={{ borderRadius: "25px" }}
                    src={data.cocktailImage}
                  />
                  <Typography
                    variant="h5"
                    color="white"
                    fontFamily={"Gloria Hallelujah"}
                  >
                    Tags:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="white"
                    fontFamily={"Gloria Hallelujah"}
                  >
                    {data.tags}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box marginLeft="2%" marginTop="2%" marginRight="5%">
            <Paper
              variant="outlined"
              style={{
                ...paperStyle.paperContainer,
                backgroundColor: grey[200],
              }}
            >
              <Typography
                variant="h1"
                color="black"
                fontFamily={"Gloria Hallelujah"}
                fontWeight="bold"
              >
                {data.cocktailName}
              </Typography>
            </Paper>
            <Box marginTop="3%">
              <Paper variant="outlined" style={paperStyle.paperContainer}>
                <Typography
                  variant="h3"
                  color="white"
                  fontFamily="WalterTurncoat"
                  fontWeight="bold"
                >
                  Instructions:
                </Typography>
                <Typography
                  variant="h4"
                  color="white"
                  fontFamily={"WalterTurncoat"}
                >
                  {data.instructions}
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
        <Box marginLeft="2%" marginTop="2%" flexGrow={1} marginRight="5%">
          <Paper variant="outlined" style={paperStyle.paperContainer}>
            <Typography
              variant="h4"
              color="white"
              fontFamily={"Gloria Hallelujah"}
            >
              Ingredients:
            </Typography>
            <IngredientGrid
              ingredientImage={data.ingredientImages}
              ingredient={data.ingredients}
              ingredientMeasure={data.ingredientMeasures}
            />
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
}
