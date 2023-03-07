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
    <Box
      display="flex"
      justifyContent="center"
      position="fixed"
      bottom="0"
      width="100%"
    >
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
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFirstChecked}
                    onChange={handleCheckboxChange}
                    name="first"
                  />
                }
                label="Yes (Alcohol)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!isFirstChecked}
                    onChange={handleCheckboxChange}
                    name="second"
                  />
                }
                label="No, I'm boring"
              />
            </FormGroup>
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
