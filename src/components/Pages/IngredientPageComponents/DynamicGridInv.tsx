import { Grid, makeStyles } from "@material-ui/core";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import IngredientBox from "./IngredientBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";

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
    witdth: "6vw",
    height: "16vh",
    textAlign: "center",
    marginBottom: "4%",
  },
});

export interface Ingredient {
  id: number;
  image: string;
  ingredientName: string;
}

const DynamicGridInv = ({ data }: { data: any }) => {
  const [currentLimit, setCurrentLimit] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();
  const [itemLimit, setItemLimit] = useState(12);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [inventory, setInventory] = useState<Ingredient[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log(windowSize);
    }
    if (windowSize.width >= 2074) setItemLimit(18);
    else if (windowSize.width < 2074 && windowSize.width > 1274)
      setItemLimit(12);
    else if (windowSize.width < 1274 && windowSize.width > 814) setItemLimit(8);
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

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("access_token") != undefined &&
      sessionStorage.getItem("access_token") != null
    ) {
      axios
        .get("https://api.smartinies.recipes/inventory", {
          headers: headers,
        })
        .then((response) => {
          setInventory(response.data);
        })
        .catch((error) => {
          console.error(error);
          setInventory([]);
        });
    }
  }, [checked]);

  function checkIfIdExists(idString: string): boolean {
    const id = parseInt(idString);
    return inventory.some((inventory) => inventory.id === id);
  }

  const handleCheckChange = (input: boolean | null) => {};
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
              .map((ingredient: Ingredient) => {
                if (inventory.length > 0) {
                  const exists = checkIfIdExists(ingredient.id.toString());
                  console.log(exists);
                  return (
                    <Grid
                      item
                      xs
                      className={classes.gridItem}
                      key={ingredient.id}
                    >
                      <Box width={"12vw"} justifyContent={"center"}>
                        <IngredientBox
                          id={ingredient.id}
                          image={ingredient.image}
                          ingredientName={ingredient.ingredientName}
                          onCheckChange={handleCheckChange}
                          isFav={exists}
                        />
                        <Box
                          width="15wh"
                          display="flex"
                          justifyContent={"center"}
                        >
                          <Typography width={"14vw"} noWrap>
                            {ingredient.ingredientName}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      item
                      xs
                      className={classes.gridItem}
                      key={ingredient.id}
                    >
                      <Box width={"12vw"} justifyContent={"center"}>
                        <IngredientBox
                          id={ingredient.id}
                          image={ingredient.image}
                          ingredientName={ingredient.ingredientName}
                          onCheckChange={handleCheckChange}
                          isFav={true}
                        />
                        <Box
                          width="15wh"
                          display="flex"
                          justifyContent={"center"}
                        >
                          <Typography width={"14vw"} noWrap>
                            {ingredient.ingredientName}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                }
              })}
          </Grid>
          <Box display="flex" justifyContent={"center"} marginTop="1%">
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
      <Box
        fontFamily={"Gloria Hallelujah"}
        display="flex"
        justifyContent={"center"}
        alignItems="flex-end"
      >
        <p>Available Ingredients: {data.length}</p>
      </Box>
    </Box>
  );
};

export default DynamicGridInv;
