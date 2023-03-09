import { Box } from "@mui/material";
import { useState } from "react";
import AppBarElement from "../AppBar/AppBarElement";
import Images from "../BilderKarussel/Images";
import FilterDrawer from "../FilterDrawer";
function HomePage() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchValueChange = (input: string) => {
    setSearchValue(input);
    console.log("HomePage" + searchValue);
  };
  return (
    <Box height="100vh">
      <AppBarElement onSearchValueChange={handleSearchValueChange} />
      <Images search={searchValue} />
      <FilterDrawer />
    </Box>
  );
}

export default HomePage;
