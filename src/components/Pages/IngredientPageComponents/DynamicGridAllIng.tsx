import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";
import { Box, IconButton, Paper } from "@mui/material";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  useState,
} from "react";
import { useIngredients } from "./IngredientServer";
import IngredientBox from "./IngredientBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

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
    witdth: "220px",
    height: "250px",
    textAlign: "center",
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

const DynamicGridAllIng = ({ data }: { data: any }) => {
  const [currentLimit, setCurrentLimit] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();
  console.log(data);

  const forwardPage = () => {
    setCurrentLimit(currentLimit + 10), setPageNumber(pageNumber + 1);
  };
  const BackwardPage = () => {
    setCurrentLimit(currentLimit - 10), setPageNumber(pageNumber - 1);
  };
  return (
    <Box width={"70%"}>
      <Box display="flex" justifyContent={"center"}>
        <Box alignItems="center" justifyContent="center" display="flex">
          <IconButton
            onClick={BackwardPage}
            disabled={pageNumber == 1}
            sx={{ height: "auto" }}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
        </Box>
        <Paper sx={{ borderRadius: "25px", padding: "2%" }}>
          <Grid container className={classes.gridContainer} spacing={2}>
            {data
              .slice(currentLimit, currentLimit + 10)
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
          <Box display="flex" justifyContent={"center"}>
            <p className="prevent-select">
              Page: {pageNumber}/{Math.ceil(data.length / 10)}
            </p>
          </Box>
        </Paper>
        <Box alignItems="center" justifyContent="center" display="flex">
          <IconButton
            onClick={forwardPage}
            sx={{ height: "auto" }}
            disabled={pageNumber == Math.ceil(data.length / 10)}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems="flex-end">
        <p>Available Ingredients: {data.length}</p>
      </Box>
    </Box>
  );
};

export default DynamicGridAllIng;
