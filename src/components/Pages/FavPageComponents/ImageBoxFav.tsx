import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./hoverFav.css";
import axios from "axios";

interface Cocktail {
  cocktailName: string;
  id: number;
  image: string;
  instructions: string;
}

const ImageBox = forwardRef<
  HTMLImageElement,
  { source: string; alt: string; id: string }
>(({ source, alt, id }, ref) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [checkForAcc, setCheckForAccount] = useState(
    localStorage.getItem("access_token") != null
  );
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };

  useEffect(() => {
    axios
      .get("https://api.smartinies.recipes/favourites", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setCocktails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (cocktails.length > 0) {
      const exists = checkIfIdExists(id);
      setChecked(exists);
    }
  }, [cocktails]);

  function checkIfIdExists(idString: string): boolean {
    const id = parseInt(idString);
    return cocktails.some((cocktail) => cocktail.id === id);
  }

  // const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      console.log("Fav removed");
      handleRemoveFav();
    } else {
      console.log("Fav added");
      handleAddFav();
    }
    setChecked(event.target.checked);
    console.log(checkIfIdExists(id));
  };

  const handleAddFav = async () => {
    try {
      const response = await axios.post(
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
      const response = await axios.post(
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
