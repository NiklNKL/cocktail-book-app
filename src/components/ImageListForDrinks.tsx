import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
} from "@mui/material";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";

import "./BilderKarussel/hover.css";

function ImageListForDrinks(props: any) {
  return (
    <ImageList
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      {props.data.map(
        (item: {
          id: Key | null | undefined;
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
          <ImageListItem key={item.id} className="container">
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
              className="image"
              draggable="false"
            />
            <Box className="middle">
              <Box className="text">{item.cocktailName}</Box>
              <Box className="button">
                <Button href={"/cocktail/" + item.id}>Details</Button>
                {/* Check position: {position.toString()} */}
              </Box>
            </Box>
            <ImageListItemBar title={item.cocktailName} />
          </ImageListItem>
        )
      )}
    </ImageList>
  );
}

export default ImageListForDrinks;
