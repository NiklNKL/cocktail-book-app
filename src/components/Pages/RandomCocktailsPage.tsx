import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Toolbar,
} from "@mui/material";
import AppBarElement from "../AppBarElement";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";

function CocktailList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.smartinies.recipes/random_list?startAt=0&numResults=5"
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);
  return (
    <Box height="100vh">
      <AppBarElement />
      <Toolbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginLeft={"50px"}
        marginRight={"50px"}
      >
        <ImageList
          sx={{ display: "inline", marginTop: "20px" }}
          rowHeight="auto"
        >
          {data.map(
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
    </Box>
  );
}

export default CocktailList;
