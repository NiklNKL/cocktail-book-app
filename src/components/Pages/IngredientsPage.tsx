import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Toolbar,
} from "@mui/material";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import AppBarElement from "../AppBarElement";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";

function Ingredients() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.smartinies.recipes/listIngredients?startAt=0"
        );
        //await new Promise((resolve) => setTimeout(resolve, 5000));
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
          {data
            .slice(0, limit)
            .map(
              (item: {
                id: Key | null | undefined;
                img: Key | null | undefined;
                image: any;
                ingredientName:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | null
                  | undefined;
              }) => (
                <ImageListItem key={item.id} sx={{ width: "auto" }}>
                  <img src={item.image} loading="lazy" />
                  <ImageListItemBar
                    title={item.ingredientName}
                    position="bottom"
                  />
                </ImageListItem>
              )
            )}
        </ImageList>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          startIcon={<RefreshIcon />}
          variant="outlined"
          onClick={() => setLimit(limit + 10)}
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
}

export default Ingredients;
