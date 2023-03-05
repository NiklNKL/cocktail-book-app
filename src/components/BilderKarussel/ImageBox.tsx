import { Box } from "@mui/material";
import "./hover.css";

export default function ImageBox({ source, alt }) {
  return (
    <Box className="container">
      <img src={source} alt={alt} className="image" />
      <Box className="middle">
        <Box className="text">{alt}</Box>
      </Box>
    </Box>
  );
}
