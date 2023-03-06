import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
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
  justifyContent: "flex-end",
}));

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleDrawerOpen}>Open Filters</Button>
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
          justifyContent="center"
          alignItems="center"
        >
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
