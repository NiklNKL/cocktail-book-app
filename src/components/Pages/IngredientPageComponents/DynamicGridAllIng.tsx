import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";
import { Box, IconButton, Paper, Typography } from "@mui/material";
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
    witdth: "200px",
    height: "200px",
    textAlign: "center",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
  },
});

export interface Ingredient {
  id: Key;
  image: string;
  ingredientName: string;
}

type GridProps = {
  onCheckChange: (input: boolean | null) => void;
  data: any;
};

const DynamicGridAllIng = (props: GridProps) => {
  const [update, setUpdate] = useState<boolean | null>(false);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();
  console.log(props.data);

  const forwardPage = () => {
    setCurrentLimit(currentLimit + 15), setPageNumber(pageNumber + 1);
  };
  const BackwardPage = () => {
    setCurrentLimit(currentLimit - 15), setPageNumber(pageNumber - 1);
  };

  const handleCheckChange = (input: boolean | null) => {
    setUpdate(!input);
    props.onCheckChange(update);
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
            {props.data
              .slice(currentLimit, currentLimit + 15)
              .map((ingredient: Ingredient) => (
                <Grid item xs className={classes.gridItem} key={ingredient.id}>
                  <Box>
                    <Box marginBottom={"5%"}>
                      <Typography>{ingredient.ingredientName}</Typography>
                    </Box>

                    <IngredientBox
                      id={ingredient.id}
                      image={ingredient.image}
                      ingredientName={ingredient.ingredientName}
                      onCheckChange={handleCheckChange}
                    />
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Box display="flex" justifyContent={"center"} marginTop="1%">
            <p className="prevent-select">
              Page: {pageNumber}/{Math.ceil(props.data.length / 15)}
            </p>
          </Box>
        </Paper>
        <Box alignItems="center" justifyContent="center" display="flex">
          <IconButton
            onClick={forwardPage}
            sx={{ height: "auto" }}
            disabled={pageNumber == Math.ceil(props.data.length / 15)}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems="flex-end">
        <p>Available Ingredients: {props.data.length}</p>
      </Box>
    </Box>
  );
};

export default DynamicGridAllIng;
