import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AppBarElement from "../AppBar/AppBarElement";
import Images from "../BilderKarussel/Images";
import FilterDrawer from "../FilterDrawer";
function HomePage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [checked, setChecked] = useState(false);

  const handleSearchValueChange = (input: string) => {
    setSearchValue(input);
    console.log("HomePage" + searchValue);
  };

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <Box height="100vh" className="homepage">
      <AppBarElement onSearchValueChange={handleSearchValueChange} />
      <Images search={searchValue} checked={checked} />
      {/* <FilterDrawer /> */}
      <Box display="flex" justifyContent={"center"} alignItems="center">
        <Typography>Only use available ingredients: </Typography>
        <Checkbox checked={checked} onClick={handleChange}></Checkbox>
      </Box>
    </Box>
  );
}

export default HomePage;
