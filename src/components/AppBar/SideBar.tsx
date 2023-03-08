import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TuneIcon from "@mui/icons-material/Tune";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WineBarIcon from "@mui/icons-material/WineBar";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CocktailList from "../Pages/RandomCocktailsPage";
import IngredientsPage from "../Pages/IngredientsPage";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const handleButtonClickFilters = async () => {
    const response = await axios.get(
      "https://api.smartinies.recipes/random_list?startAt=0&numResults=19"
    );
    setData(response.data);
  };

  const handleButtonClickFavCocktails = async () => {
    const response = await axios.get(
      "https://api.smartinies.recipes/random_list?startAt=0&numResults=19"
    );
    setData(response.data);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" alignItems="center" width="2%">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Button
          variant="text"
          startIcon={<LocalBarIcon />}
          color="inherit"
          size="large"
          href="/allcocktails"
        >
          {"Cocktails"}
        </Button>
        <Button
          variant="text"
          startIcon={<LiquorIcon />}
          color="inherit"
          size="large"
          href="/ingredients"
        >
          {"Ingredients"}
        </Button>
        <Button
          variant="text"
          href="/favourites"
          startIcon={<FavoriteIcon />}
          color="inherit"
          size="large"
        >
          {"Favorite Cocktails"}
        </Button>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
