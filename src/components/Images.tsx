import { Box, Stack } from "@mui/material";

export default function Images() {
  return (
    <Stack direction="row" spacing={2} overflow="auto" height={"50vh"}>
      <Box
        display="flex"
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.7, 0.6, 0.5],
          },
        }}
      >
        <img
          src="https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
          alt="1"
        ></img>
      </Box>
      <img
        src="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
        alt="1"
      ></img>
      <img
        src="https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg"
        alt="1"
      ></img>
      <img
        src="https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
        alt="1"
      ></img>
      <img
        src="https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
        alt="1"
      ></img>
    </Stack>
  );
}
