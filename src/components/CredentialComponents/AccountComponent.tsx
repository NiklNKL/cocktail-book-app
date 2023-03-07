import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Mode } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

export default function AccountPage({ setToken }: { setToken: any }) {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(false);

    // Redirect to the home page or a protected route
  };
  return (
    <CssVarsProvider>
      <main>
        <Box>
          <Box marginBottom="10px">
            <Typography level="h4" component="h1">
              <b>Your Account</b>
            </Typography>
            <Typography level="body2">You are logged in as</Typography>
          </Box>
          <Typography level="h4" component="h1">
            <b>Dominik Ruth</b>
          </Typography>
          <Button
            sx={{ mt: 3 /* margin top */ }}
            onClick={handleLogout}
            fullWidth
          >
            Leave the Club...
          </Button>
        </Box>
      </main>
    </CssVarsProvider>
  );
}

AccountPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
