import { Box, ImageList, ImageListItem } from "@mui/material";
import { Key } from "react";
import AppBarElement from "../AppBarElement";
import { useLocation } from "react-router-dom";

function Ingredients() {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <Box height="100vh">
      <AppBarElement />

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {data.map(
          (item: {
            id: Key | null | undefined;
            image: any;
            ingredientName: string | undefined;
          }) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.ingredientName}
                loading="lazy"
              />
            </ImageListItem>
          )
        )}
      </ImageList>
    </Box>
  );
}

export default Ingredients;
