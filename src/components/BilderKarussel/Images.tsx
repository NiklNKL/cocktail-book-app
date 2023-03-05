import { Box, Stack } from "@mui/material";
import ImageBox from "./ImageBox";
import "./hover.css";

export default function Images() {
  return (
    <Stack
      direction="row"
      spacing={2}
      overflow="auto"
      height={"70vh"}
      className="scroll"
    >
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
        }
        alt={"Mojito"}
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
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg"
        }
        alt={"Daiquiri"}
      />
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
        }
        alt={"Margarita"}
      />
      <ImageBox
        source={
          "https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg"
        }
        alt={"Long Island Tea"}
      />
    </Stack>
  );
}
