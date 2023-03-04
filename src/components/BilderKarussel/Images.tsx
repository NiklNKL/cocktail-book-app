import { Box, Stack } from "@mui/material";
import ImageBox from "./ImageBox";

export default function Images() {
  return (
    <Stack direction="row" spacing={2} overflow="auto" height={"50vh"}>
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
        }
        alt={"Mochito"}
      />
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
        }
        alt={"Old Fashioned"}
      />
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg"
        }
        alt={"Negroni"}
      />
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg"
        }
        alt={"Whiskey Sour"}
      />
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg"
        }
        alt={"Dry Martini"}
      />
    </Stack>
  );
}
