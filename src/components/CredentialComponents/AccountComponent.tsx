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

export default function AccountPage({
  setToken,
  setDeletionSuccess,
}: {
  setToken: any;
  setDeletionSuccess: any;
}) {
  const [remove, setRemove] = useState(false);
  const [leave, setLeave] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };
  const resetState = () => {
    setRemove(false);
    setLeave(false);
  };
  const handleLogout = async () => {
    try {
      // const response = await axios.get(
      //   "https://api.smartinies.recipes/logout",
      //   { headers: headers }
      // );
      setToken(false);
      localStorage.removeItem("access_token");
      window.location.reload();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "https://api.smartinies.recipes/deleteAccount",
        { password },
        { headers: headers }
      );
      setDeletionSuccess(true);
      setPasswordCheck(false);
      setToken(false);
      localStorage.removeItem("access_token");
      window.location.reload();
      // Redirect to the home page or a protected route
    } catch (error) {
      setPasswordCheck(true);
      // Handle login error
    }
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
                <b>{localStorage.getItem("user_name")}</b>
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
                {passwordCheck ? (
                  <Typography
                    level="h5"
                    textAlign="center"
                    marginTop="10px"
                    color="danger"
                  >
                    <b>Password not correct!</b>
                  </Typography>
                ) : (
                  <Typography level="h5" textAlign="center" marginTop="10px">
                    <b>Last chance</b>
                  </Typography>
                )}
                <Typography level="h5" textAlign="center" marginTop="10px">
                  Please don`t... We can have so much fun!
                </Typography>
              </Box>
              <Typography level="h5" textAlign="center" marginTop="10px">
                The next step cannot be undone
              </Typography>
              <FormControl>
                <FormLabel>Enter Password</FormLabel>
                <Input
                  // html input attribute
                  name="password"
                  type="password"
                  placeholder="Your Password..."
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
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
                onClick={handleDelete}
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
