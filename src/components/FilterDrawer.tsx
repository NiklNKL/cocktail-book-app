import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  IconButton,
  Divider,
  styled,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DropdownButton from "./DropdownButton";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  const [isFirstChecked, setIsFirstChecked] = useState<boolean>(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirstChecked(event.target.name === "first");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="20px">
      <IconButton
        sx={{ justifyContent: "center" }}
        size="large"
        onClick={handleDrawerOpen}
      >
        <ExpandLessIcon />
      </IconButton>
      <Drawer
        sx={{
          width: "100%",
          flexShrink: 0,
        }}
        variant="temporary"
        anchor="bottom"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Grid
          marginBottom={"20px"}
          marginTop={"20px"}
          container
          spacing={3}
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid>
            <h1>You like fun?</h1>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select one option</FormLabel>
              <RadioGroup
                aria-label="options"
                name="options"
                //</FormControl>value={selectedValue} onChange={handleChange}
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label="With Alcohol"
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label="Without Alcohol"
                />
                <FormControlLabel
                  value="option3"
                  control={<Radio />}
                  label="I want all"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid>
            <h1>Taste</h1>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Fruity" />
              <FormControlLabel control={<Checkbox />} label="Bitter" />
              <FormControlLabel control={<Checkbox />} label="Sour" />
              <FormControlLabel control={<Checkbox />} label="Sparkling" />
            </FormGroup>
          </Grid>
          <Grid>
            <h1>Main Alcohol</h1>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Gin" />
              <FormControlLabel control={<Checkbox />} label="Vodka" />
              <FormControlLabel control={<Checkbox />} label="Rum" />
              <FormControlLabel control={<Checkbox />} label="Whiskey" />
              <FormControlLabel control={<Checkbox />} label="Tequila" />
            </FormGroup>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
}
