import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Link,
  Popover,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SideBar from "../AppBar/SideBar";
import CredentialComponent from "../CredentialComponents/CredentialPopup";

export default function AppBarElement() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const color = () => {
    if (sessionStorage.getItem("access_token") == undefined) {
      return "inherit";
    } else {
      return "success";
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <CredentialComponent />
    </Popover>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          display: "flex",
          width: "100%",
          height: "8%",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <SideBar />
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Link variant="h6" underline="none" color="inherit" href="/">
              {
                <Typography fontSize={45} fontFamily={"Gloria Hallelujah"}>
                  Smartinies Bar
                </Typography>
              }
            </Link>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color={color()}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
