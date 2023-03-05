import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import AppBarElement from "../AppBarElement";
import { useLocation } from "react-router-dom";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";

async function CocktailList() {
  const [data, setData] = useState(null);

  const response = await fetch(
    "https://heavydrinking.herokuapp.com/random_list?startAt=0&numResults=5"
  )
    .then((response) => response.json())
    .then((response) => setData(response));

  return (
    <Box height="100vh">
      <AppBarElement />

      <ImageList sx={{ width: 500, height: 450 }}>
        {data.map(
          (item: {
            img: Key | null | undefined;
            image: any;
            cocktailName:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | null
              | undefined;
            instructions:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          }) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.cocktailName}
                subtitle={<span>Instructions: {item.instructions}</span>}
                position="below"
              />
            </ImageListItem>
          )
        )}
      </ImageList>
    </Box>
  );
}

export default CocktailList;
