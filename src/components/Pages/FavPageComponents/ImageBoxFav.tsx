import { Box, Button, Checkbox } from "@mui/material";
import { useState, forwardRef } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./hoverFav.css";
import axios from "axios";

const ImageBox = forwardRef<
  HTMLImageElement,
  { source: string; alt: string; id: string; isFav: boolean }
>(({ source, alt, id, isFav }, ref) => {
  const [checked, setChecked] = useState<boolean | null>(isFav);
  const [checkForAcc, setCheckForAccount] = useState(
    sessionStorage.getItem("access_token") != null
  );
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      handleRemoveFav();
    } else {
      handleAddFav();
    }
    setChecked(event.target.checked);
  };

  const handleAddFav = async () => {
    try {
      await axios.post(
        "https://api.smartinies.recipes/addFavourite",
        { id },
        { headers: headers }
      );

      // Redirect to the home page or a protected route
    } catch (error) {
      // Handle login error
    }
  };

  const handleRemoveFav = async () => {
    try {
      await axios.post(
        "https://api.smartinies.recipes/removeFavourite",
        { id },
        { headers: headers }
      );

      // Redirect to the home page or a protected route
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <Box className="container">
      <img
        src={source}
        ref={ref}
        alt={alt}
        className="image"
        draggable="false"
      />

      <Box className="middle">
        <Box className="text">{alt}</Box>
        <Box className="button">
          <Button href={"/cocktail/" + id}>Details</Button>
        </Box>
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
});

export default ImageBox;
