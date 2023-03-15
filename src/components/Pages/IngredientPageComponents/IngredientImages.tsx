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
import CloseIcon from "@mui/icons-material/Close";
const useStyles = makeStyles({
  drawerPaper: {
    width: "100%",
    maxWidth: "100%",
    background: "#1e1e1e",
    height: "60vh",
    maxHeight: "60vh",
  },
});
export default function IngredientImages() {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [openAll, setOpenAll] = useState(false);
  const [update, setUpdate] = useState<boolean | null>(false);
  const [invAvailable, setInvAvailable] = useState(false);
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
          setInvAvailable(true);
        })
        .catch((error) => {
          console.error(error);
          setInvAvailable(false);
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
    <Box>
      <Box
        justifyContent={"center"}
        alignItems="center"
        display="flex"
        marginBottom="2%"
      >
        {invAvailable ? (
          <Typography variant="h3">Your Ingredients at Home:</Typography>
        ) : (
          <Typography variant="h3">
            You don't have any Ingredients yet...
          </Typography>
        )}
      </Box>

      <Box width={"100%"} justifyContent="center" display="flex">
        {invAvailable ? (
          <DynamicGridInv data={inventory} />
        ) : (
          <Typography variant="h5">
            Start to add Ingredients by pressing the button below!
          </Typography>
        )}
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
            alignItems="center"
            display="flex"
            marginBottom="2%"
            width="100%"
          >
            <Typography variant="h3" sx={{ flexGrow: 1, textAlign: "center" }}>
              All available ingredients:
            </Typography>
            <IconButton onClick={changeView}>
              <CloseIcon />
            </IconButton>
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
