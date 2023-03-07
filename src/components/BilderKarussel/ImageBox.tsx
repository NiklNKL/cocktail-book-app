import { Box, Button } from "@mui/material";
import "./hover.css";

export default function ImageBox({
  source,
  alt,
  position,
  id,
}: {
  source: string;
  alt: string;
  position: number;
  id: string;
}) {
  return (
    <Box className="container">
      <img src={source} alt={alt} className="image" draggable="false" />

      <Box className="middle">
        <Box className="text">{alt}</Box>
        <Box className="button">
          <Button href={"/cocktail/" + { id }}>Details</Button>
          {/* Check position: {position.toString()} */}
        </Box>
      </Box>
    </Box>
  );
}
