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
import LogInPage from "./LogInComponent";
import SignUpPage from "./SignUpComponent";
import AccountPage from "./AccountComponent";
import useToken from "./useToken";

// function setToken({ userToken }: { userToken: any }) {
//   sessionStorage.setItem("token", userToken);
// }

// function getToken() {
//   const tokenString = localStorage.getItem("access_token");
//   //   const userToken = JSON.parse(tokenString);
//   return tokenString;
// }
export default function CredentialComponent() {
  const [showLogin, setShowLogin] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { token, setToken } = useToken();
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const changeView = () => {
    setShowLogin(!showLogin);
    setSignUpSuccess(false);
    setDeletionSuccess(false);
  };

  if (!token) {
    return (
      <CssVarsProvider>
        <main>
          <Sheet
            sx={{
              width: 300,
              mx: "auto", // margin left & right
              my: "auto", // margin top & botom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
            }}
            variant="outlined"
          >
            {showLogin ? (
              <LogInPage
                setToken={setToken}
                signUpSuccess={signUpSuccess}
                deletionSuccess={deletionSuccess}
              />
            ) : (
              <SignUpPage
                setShowLogin={setShowLogin}
                setSignUpSuccess={setSignUpSuccess}
              />
            )}
            <Box display="flex" alignContent="center">
              {showLogin ? (
                <p>Dont have an account?</p>
              ) : (
                <p>Already have an account?</p>
              )}
              <Button
                variant="plain"
                onClick={() => {
                  changeView();
                }}
                style={{ backgroundColor: "transparent" }}
              >
                {showLogin ? "Sign Up" : "Login"}
              </Button>
            </Box>
          </Sheet>
        </main>
      </CssVarsProvider>
    );
  } else if (token) {
    return (
      <CssVarsProvider>
        <main>
          <Sheet
            sx={{
              width: 300,
              mx: "auto", // margin left & right
              my: "auto", // margin top & botom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
            }}
            variant="outlined"
          >
            <AccountPage
              setToken={setToken}
              setDeletionSuccess={setDeletionSuccess}
            />
          </Sheet>
        </main>
      </CssVarsProvider>
    );
  } else {
    return (
      <Box>
        <h1>Error</h1>
      </Box>
    );
  }
}
