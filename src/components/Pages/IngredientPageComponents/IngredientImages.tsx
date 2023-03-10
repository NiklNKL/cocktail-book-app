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

export default function IngredientImages() {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [inventory, setInventory] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };
  const forwardPage = () => {
    setCurrentImg(currentImg + 25), setPageNumber(pageNumber + 1);
  };
  const BackwardPage = () => {
    setCurrentImg(currentImg - 25), setPageNumber(pageNumber - 1);
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
      <Box width={"100%"} justifyContent="center" display="flex">
        <DynamicGridInv data={inventory} currentLimit={currentImg} />
      </Box>
      <Box
        width={"100%"}
        justifyContent="center"
        display="flex"
        marginTop={"2%"}
      >
        <DynamicGridAllIng data={ingredients} />
      </Box>
    </Box>
  );
}
