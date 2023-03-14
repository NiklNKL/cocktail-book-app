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
    background: "#1e1e1e",
    height: "100%",
    maxHeight: "100%",
  },
});
export default function IngredientImages() {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [openAll, setOpenAll] = useState(false);
  const [update, setUpdate] = useState<boolean | null>(false);
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
    setOpenAll(!openAll);
  };

  const { data: ingredients = [], isLoading } = useIngredients(update);
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

  const handleCheckChange = (input: boolean | null) => {
    setUpdate(!input);
  };
  return (
    <Box paddingTop={"5%"}>
      <Box
        justifyContent={"center"}
        alignItems="center"
        display="flex"
        marginBottom="2%"
      >
        <Typography variant="h3">Your Ingredients at Home:</Typography>
      </Box>

      <Box width={"100%"} justifyContent="center" display="flex">
        <DynamicGridInv data={inventory} />
      </Box>

      <Box
        justifyContent={"center"}
        alignItems="center"
        display="flex"
        marginTop={"2%"}
      >
        <Button onClick={changeView} variant="contained">
          Browse all Ingredients
        </Button>
      </Box>

      <SwipeableDrawer
        anchor={"bottom"}
        open={openAll}
        onClose={() => setOpenAll(false)}
        onOpen={() => setOpenAll(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box p={2}>
          <Box
            justifyContent={"center"}
            alignItems="center"
            display="flex"
            marginBottom="2%"
          >
            <Typography variant="h3">All available ingredients:</Typography>
          </Box>
          <Box width={"100%"} justifyContent="center" display="flex">
            <DynamicGridAllIng
              data={ingredients}
              onCheckChange={handleCheckChange}
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
