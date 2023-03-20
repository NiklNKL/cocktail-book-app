import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import { useState } from "react";
import { Box } from "@mui/material";
import LogInPage from "./LogInComponent";
import SignUpPage from "./SignUpComponent";
import AccountPage from "./AccountComponent";
import useToken from "./useToken";

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
