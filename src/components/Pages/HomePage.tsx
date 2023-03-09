import { Box, Button } from "@mui/material";
import AppBarElement from "../AppBar/AppBarElement";
import Images from "../BilderKarussel/Images";
import FilterDrawer from "../FilterDrawer";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
function HomePage() {
  const [limit, setLimit] = useState(20);
  const [cutoff, setCutOff] = useState(0);
  // const subtract = () => {
  //   const number = 10;
  //   if (cutoff >= 0 && cutoff - number > 0) return number;
  //   else return 0;
  // };
  console.log(cutoff);

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchValueChange = (input: string) => {
    setSearchValue(input);
    console.log("HomePage" + searchValue);
  };
  return (
    <Box height="100vh">
      <AppBarElement onSearchValueChange={handleSearchValueChange} />

      <Images limit={limit} cutoff={cutoff} search={searchValue} />
      {/* <Box
        display="flex"
        bottom="0"
        position="fixed"
        width="100%"
        justifyContent="end"
        justifyItems=""
      >
        
        <Button
          startIcon={<RefreshIcon />}
          variant="contained"
          onClick={() => {
            setLimit(limit + 10);
            setCutOff(cutoff + 10);
          }}
        >
          Load More
        </Button>
      </Box> */}
      <FilterDrawer />
    </Box>
  );
}

export default HomePage;
