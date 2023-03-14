import {
  Box,
  CircularProgress,
  Stack,
  Button,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import IngredientBox from "./IngredientBox";
import "./ingHover.css";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useIngredients } from "./IngredientServer";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DynamicGridAllIng from "./DynamicGridAllIng";
import DynamicGridInv from "./DynamicGridInv";
import axios from "axios";
import { SwipeableDrawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  drawerPaper: {
    width: "100%",
    maxWidth: "100%",
    background: "red",
  },
});
export default function IngredientImages() {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [showFav, setShowFav] = useState(true);
  const [openFav, setOpenFav] = useState(true);
  const [openAll, setOpenAll] = useState(false);
  const classes = useStyles();

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };
  const forwardPage = () => {
    setCurrentImg(currentImg + 10), setPageNumber(pageNumber + 1);
  };
  const BackwardPage = () => {
    setCurrentImg(currentImg - 10), setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    if (
      localStorage.getItem("access_token") != undefined &&
      localStorage.getItem("access_token") != null
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
        });
    }
  }, []);
  const changeView = () => {
    // "setShowFav(!showFav);";
    setOpenFav(!openFav);
    setOpenAll(!openAll);
  };
  const selectList = () => {
    if (showFav) {
      return (
        <Box width={"100%"} justifyContent="center" display="flex">
          <DynamicGridInv data={inventory} />
          <Button onClick={changeView}>Add new ingredients:</Button>
        </Box>
      );
    } else {
      return (
        <Box
          width={"100%"}
          justifyContent="center"
          display="flex"
          marginTop={"2%"}
        >
          <DynamicGridAllIng data={ingredients} />
          <Button onClick={changeView}>Add new ingredients:</Button>
        </Box>
      );
    }
  };

  const { data: ingredients = [], isLoading } = useIngredients();
  if (isLoading)
    return (
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />;
      </Box>
    );
  return (
    <Box>
      {/* <Box width={"100%"} justifyContent="center" display="flex">
        <DynamicGridInv data={inventory} />
      </Box>
      <Box
        width={"100%"}
        justifyContent="center"
        display="flex"
        marginTop={"2%"}
      >
        <DynamicGridAllIng data={ingredients} />
      </Box> */}
      {/* {selectList()} */}
      <Button onClick={changeView}>Test</Button>
      <SwipeableDrawer
        anchor={"right"}
        open={openFav}
        onClose={() => setOpenFav(false)}
        onOpen={() => setOpenFav(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box p={2}>
          <Button onClick={changeView}>Show all Items</Button>
          <Box width={"100%"} justifyContent="center" display="flex">
            <DynamicGridInv data={inventory} />
          </Box>
        </Box>
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor={"left"}
        open={openAll}
        onClose={() => setOpenAll(false)}
        onOpen={() => setOpenAll(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box p={2}>
          <Button onClick={changeView}>Show Inventory</Button>
          <Box width={"100%"} justifyContent="center" display="flex">
            <DynamicGridAllIng data={ingredients} />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
