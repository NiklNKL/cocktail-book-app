import { Box } from "@mui/material";

export default function ImageBox({ source, alt }) {
  return (
    <Box display="flex">
      {/* <Box
        display="flex"
        sx={{
          opacity: "0.0",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: "1",
          },
        }}
      >
        <h1>Test</h1>
      </Box> */}
      <Box
        display="flex"
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.7, 0.6, 0.5],
          },
        }}
      >
        <img src={source} alt={alt}></img>
      </Box>
    </Box>
  );
}
