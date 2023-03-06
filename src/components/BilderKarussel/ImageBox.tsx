import { Box, Button } from "@mui/material";
import "./hover.css";

export default function ImageBox({
  source,
  alt,
  position,
}: {
  source: string;
  alt: string;
  position: number;
}) {
  return (
    <Box className="container">
      <img src={source} alt={alt} className="image" draggable="false" />

      <Box className="middle">
        <Box className="text">{alt}</Box>
        <Box className="button">
          <Button href={"/cocktail/" + alt}>{position.toString()}</Button>
        </Box>
      </Box>
    </Box>
  );
}
