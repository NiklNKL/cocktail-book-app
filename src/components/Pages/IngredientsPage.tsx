import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Toolbar,
} from "@mui/material";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import AppBarElementNoSearch from "../AppBarNoSearch/AppBarElementNoSearch";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import DynamicGridAllIng from "./IngredientPageComponents/DynamicGridAllIng";
import IngredientImages from "./IngredientPageComponents/IngredientImages";

function Ingredients() {
  return (
    <Box>
      <AppBarElementNoSearch />
      <Toolbar />
      <IngredientImages />
    </Box>
  );
}

export default Ingredients;
