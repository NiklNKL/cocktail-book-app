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
import { Box, colors } from "@mui/material";
import PropTypes from "prop-types";

export default function AccountPage({ setToken }: { setToken: any }) {
  const [remove, setRemove] = useState(false);
  const [leave, setLeave] = useState(false);
  const resetState = () => {
    setRemove(false);
    setLeave(false);
  };
  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem("access_token");

    // Redirect to the home page or a protected route
  };
  if (!remove && !leave) {
    return (
      <Box>
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
              <Button
                sx={{ mt: 1 /* margin top */ }}
                onClick={() => setRemove(true)}
                color="danger"
                size="md"
                fullWidth
              >
                ...forever!!!
              </Button>
            </Box>
          </main>
        </CssVarsProvider>
      </Box>
    );
  } else if (remove) {
    return (
      <Box>
        <CssVarsProvider>
          <main>
            <Box>
              <Box marginBottom="10px">
                <Typography level="h5" textAlign="center">
                  <b>Hey, what are you doing?</b>
                </Typography>
                <Typography level="h5" textAlign="center" marginTop="10px">
                  I wouldn`t do that if I was you!
                </Typography>
              </Box>
              <Typography level="h5" textAlign="center" marginTop="10px">
                Just click the green button, okay?
              </Typography>
              <Button
                sx={{ mt: 3 /* margin top */ }}
                onClick={resetState}
                fullWidth
                color="success"
              >
                <b>Let´s Party!</b>
              </Button>
              <Button
                sx={{ mt: 1 /* margin top */ }}
                onClick={() => {
                  setLeave(true);
                  setRemove(false);
                }}
                color="danger"
                size="md"
                fullWidth
              >
                Let me go.
              </Button>
            </Box>
          </main>
        </CssVarsProvider>
      </Box>
    );
  } else if (leave) {
    return (
      <Box>
        <CssVarsProvider>
          <main>
            <Box>
              <Box marginBottom="10px">
                <Typography level="h5" textAlign="center" marginTop="10px">
                  <b>Last chance</b>
                </Typography>
                <Typography level="h5" textAlign="center" marginTop="10px">
                  Please don`t... We can have so much fun!
                </Typography>
              </Box>
              <Typography level="h5" textAlign="center" marginTop="10px">
                The next step cannot be undone
              </Typography>
              <Button
                sx={{ mt: 3 /* margin top */ }}
                onClick={resetState}
                fullWidth
                color="success"
              >
                I wanna stay
              </Button>
              <Button
                sx={{ mt: 1 /* margin top */ }}
                onClick={handleLogout}
                color="danger"
                size="md"
                fullWidth
              >
                Goodbye :,c
              </Button>
            </Box>
          </main>
        </CssVarsProvider>
      </Box>
    );
  }
}

AccountPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
