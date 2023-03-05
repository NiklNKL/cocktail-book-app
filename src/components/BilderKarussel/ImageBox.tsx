import { Box, Button } from "@mui/material";
import "./hover.css";

export default function ImageBox({
  source,
  alt,
}: {
  source: string;
  alt: string;
}) {
  return (
    <Box className="container">
      <img src={source} alt={alt} className="image" draggable="false" />

      <Box className="middle">
        <Box className="text">{alt}</Box>
        <Button href={"/cocktail/" + alt}>Details</Button>
      </Box>
    </Box>
  );
}
