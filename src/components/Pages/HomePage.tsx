import { Box } from "@mui/material";
import { useState } from "react";
import AppBarElement from "../AppBar/AppBarElement";
import Images from "../BilderKarussel/Images";

function HomePage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchValueChange = (input: string) => {
    setSearchValue(input);
  };

  return (
    <Box height="100%" className="homepage">
      <AppBarElement onSearchValueChange={handleSearchValueChange} />
      <Images search={searchValue} />
    </Box>
  );
}

export default HomePage;
