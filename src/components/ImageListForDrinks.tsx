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
    //I want to display the images from the props.data variable along with the name and the instructions. Write code to display these images in the same size in react v6 mui
    <ImageList
      cols={2}
      rowHeight={"auto"}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContents: "center",
        objectFit: "contain",
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
          <ImageListItem
            key={item.id}
            sx={{ width: "33%", height: "auto" }}
            className="container"
          >
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
                <Button href={"/cocktail/" + item.cocktailName}>Details</Button>
                {/* Check position: {position.toString()} */}
              </Box>
            </Box>
            <ImageListItemBar
              title={item.cocktailName}
              subtitle={<span>Instructions: {item.instructions}</span>}
              position="below"
            />
          </ImageListItem>
        )
      )}
    </ImageList>
  );
}

export default ImageListForDrinks;
