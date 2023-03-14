import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  useState,
  useEffect,
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

const DynamicGridInv = ({ data }: { data: any }) => {
  const [currentLimit, setCurrentLimit] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();
  console.log(data);
  const [itemLimit, setItemLimit] = useState(18);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log(windowSize);
    }
    if (windowSize.width >= 2074) setItemLimit(26);
    else if (windowSize.width < 2074 && windowSize.width > 1274)
      setItemLimit(18);
    else if (windowSize.width < 1274 && windowSize.width > 814)
      setItemLimit(10);
    else setItemLimit(4);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const forwardPage = () => {
    setCurrentLimit(currentLimit + itemLimit), setPageNumber(pageNumber + 1);
  };
  const BackwardPage = () => {
    setCurrentLimit(currentLimit - itemLimit), setPageNumber(pageNumber - 1);
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent={"center"}
        paddingLeft="6%"
        paddingRight="6%"
      >
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
              .slice(currentLimit, currentLimit + itemLimit)
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
                      onCheckChange={() => null}
                    />
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Box display="flex" justifyContent={"center"}>
            <p className="prevent-select">
              Page: {pageNumber}/{Math.ceil(data.length / itemLimit)}
            </p>
          </Box>
        </Paper>
        <Box alignItems="center" justifyContent="center" display="flex">
          <IconButton
            onClick={forwardPage}
            sx={{ height: "auto" }}
            disabled={pageNumber == Math.ceil(data.length / itemLimit)}
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

export default DynamicGridInv;
