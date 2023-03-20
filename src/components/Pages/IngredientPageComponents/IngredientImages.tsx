import {
  Box,
  CircularProgress,
  SwipeableDrawer,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import "./ingHover.css";
import { useEffect, useState } from "react";
import { useIngredients } from "./IngredientServer";
import DynamicGridAllIng from "./DynamicGridAllIng";
import DynamicGridInv from "./DynamicGridInv";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "../../../home_background.jpg";

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
  const [inventory, setInventory] = useState([]);
  const [openAll, setOpenAll] = useState(false);
  const [update, setUpdate] = useState<boolean | null>(false);
  const [invAvailable, setInvAvailable] = useState(false);
  const classes = useStyles();

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
        marginTop="2%"
      >
        {invAvailable ? (
          <Typography fontFamily={"Gloria Hallelujah"} variant="h3">
            Your Ingredients at Home:
          </Typography>
        ) : (
          <Typography fontFamily={"Gloria Hallelujah"} variant="h3">
            You don't have any Ingredients yet...
          </Typography>
        )}
      </Box>

      <Box width={"100%"} justifyContent="center" display="flex">
        {invAvailable ? (
          <DynamicGridInv data={inventory} />
        ) : (
          <Typography fontFamily={"Gloria Hallelujah"} variant="h5">
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
            <Typography
              fontFamily={"Gloria Hallelujah"}
              variant="h3"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
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
