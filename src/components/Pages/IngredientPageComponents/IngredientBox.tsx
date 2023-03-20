import { Box, Checkbox } from "@mui/material";
import { useState } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./ingHover.css";
import axios from "axios";

export interface IngredientProps {
  id: number;
  image: string;
  ingredientName: string;
  onCheckChange: (checked: boolean | null) => void;
  isFav: boolean;
}

const IngredientBox = (props: IngredientProps) => {
  const [checked, setChecked] = useState<boolean | null>(props.isFav);
  const [checkForAcc, setCheckForAccount] = useState(
    sessionStorage.getItem("access_token") != null
  );
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      handleRemoveInv();
    } else {
      handleAddInv();
    }
    setChecked(event.target.checked);
    props.onCheckChange(checked);
  };

  const handleAddInv = async () => {
    try {
      await axios.post(
        "https://api.smartinies.recipes/addToInventory",
        { id: props.id },
        { headers: headers }
      );

      // Redirect to the home page or a protected route
    } catch (error) {
      // Handle login error
    }
  };

  const handleRemoveInv = async () => {
    try {
      await axios.post(
        "https://api.smartinies.recipes/removeFromInventory",
        { id: props.id },
        { headers: headers }
      );

      // Redirect to the home page or a protected route
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <Box className="ingContainer">
      <img
        src={props.image}
        alt={props.ingredientName}
        draggable="false"
        className="ingImage"
      />

      <Box className="ingMiddle">
        <Box>
          {checkForAcc ? (
            <Checkbox
              checked={checked ?? false}
              onChange={handleChange}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite color="error" />}
            />
          ) : (
            <Checkbox
              disabled={true}
              checked={false}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite color="error" />}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default IngredientBox;
