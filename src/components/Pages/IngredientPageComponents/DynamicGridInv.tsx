import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";
import { Box, Paper } from "@mui/material";
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from "react";
import { useIngredients } from "./IngredientServer";
import IngredientBox from "./IngredientBox";

const useStyles = makeStyles({
  gridContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    padding: "1%",

    textAlign: "center",
  },
  image: {
    witdth: "200px",
    height: "200px",
  },
});

interface Props {
  data: [];
}
export interface Ingredient {
  id: Key;
  image: string;
  ingredientName: string;
}

const DynamicGridInv = ({
  data,
  currentLimit,
}: {
  data: any;
  currentLimit: number;
}) => {
  const classes = useStyles();
  console.log(data);
  return (
    <Box width="70%">
      <Paper sx={{ borderRadius: "25px" }}>
        <Grid container className={classes.gridContainer} spacing={2}>
          {data
            .slice(currentLimit, currentLimit + 25)
            .map((ingredient: Ingredient) => (
              <Grid item xs className={classes.gridItem} key={ingredient.id}>
                <Box>
                  <h3>{ingredient.ingredientName}</h3>
                  <IngredientBox
                    id={ingredient.id}
                    image={ingredient.image}
                    ingredientName={ingredient.ingredientName}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default DynamicGridInv;
