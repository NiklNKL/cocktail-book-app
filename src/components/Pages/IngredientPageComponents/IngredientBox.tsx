import { Box, Button } from "@mui/material";
import { Key, useState } from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./ingHover.css";
import axios from "axios";

export interface Ingredient {
  id: Key;
  image: string;
  ingredientName: string;
}

const IngredientBox = ({ id, image, ingredientName }: Ingredient) => {
  const [inventory, setInventory] = useState<Ingredient[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [checkForAcc, setCheckForAccount] = useState(
    localStorage.getItem("access_token") != null
  );
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
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

  useEffect(() => {
    if (
      localStorage.getItem("access_token") != undefined &&
      localStorage.getItem("access_token") != null
    ) {
      if (inventory.length > 0) {
        const exists = checkIfIdExists(id.toString());
        setChecked(exists);
      }
    }
  }, [inventory]);

  function checkIfIdExists(idString: string): boolean {
    const id = parseInt(idString);
    return inventory.some((inventory) => inventory.id === id);
  }

  // const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      handleRemoveInv();
    } else {
      handleAddInv();
    }
    setChecked(event.target.checked);
  };

  const handleAddInv = async () => {
    try {
      await axios.post(
        "https://api.smartinies.recipes/addToInventory",
        { id },
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
        { id },
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
        src={image}
        alt={ingredientName}
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
