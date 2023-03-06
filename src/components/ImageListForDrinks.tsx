import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

function ImageListForDrinks(props: any, { type }: { type: string }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginLeft={"50px"}
      marginRight={"50px"}
    >
      <ImageList sx={{ display: "inline", marginTop: "20px" }} rowHeight="auto">
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
            <ImageListItem key={item.id} sx={{ width: "auto" }}>
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

export default ImageListForDrinks;
