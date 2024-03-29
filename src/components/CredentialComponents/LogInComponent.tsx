import { CssVarsProvider } from "@mui/joy/styles";
import { Typography, FormControl, FormLabel, Input, Button } from "@mui/joy";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

export default function LogInPage({
  setToken,
  signUpSuccess,
  deletionSuccess,
}: {
  setToken: any;
  signUpSuccess: any;
  deletionSuccess: any;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(true);

  const message = () => {
    if (!exists) return "Account not found";
    else return "Welcome!";
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api.smartinies.recipes/login",
        { email, password }
      );
      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("user_name", response.data.name);
      setToken(response.data.access_token);
      setExists(true);
      window.location.reload();

      // Redirect to the home page or a protected route
    } catch (error) {
      setExists(false);
      // Handle login error
    }
  };
  return (
    <CssVarsProvider>
      <main>
        <Box>
          <Box marginBottom="10px">
            {deletionSuccess ? (
              <Typography level="h4" component="h1" color="success">
                <b>Account deleted!</b>
              </Typography>
            ) : (
              <Typography level="h4" component="h1">
                <b>{message()}</b>
              </Typography>
            )}

            {signUpSuccess ? (
              <Typography level="body2" color="success">
                Account successfully created!
              </Typography>
            ) : (
              <Typography level="body2">Login to your Account</Typography>
            )}
          </Box>
          <Box marginBottom="10px">
            <FormControl>
              <FormLabel>Enter Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="Your Mail..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Box>
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
            onClick={handleLogin}
            fullWidth
          >
            Enter the Club!
          </Button>
        </Box>
      </main>
    </CssVarsProvider>
  );
}

LogInPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
