import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import "./hover.css";


const ImageBox = forwardRef<HTMLImageElement, { source: string; alt: string; id:string }>(
  ({ source, alt, id }, ref) => {
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
            {/* Check position: {position.toString()} */}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default ImageBox;
