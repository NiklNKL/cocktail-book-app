import { CssVarsProvider } from "@mui/joy/styles";
import { Typography, FormControl, FormLabel, Input, Button } from "@mui/joy";
import { useState } from "react";
import axios from "axios";
import { Box, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function SignUpPage({
  setShowLogin,
  setSignUpSuccess,
}: {
  setShowLogin: any;
  setSignUpSuccess: any;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const errorHelper = () => {
    if (errorMessage) {
      return (
        <Box display="flex">
          <Typography level="body2" color="danger">
            Could not create account!
          </Typography>
          <Tooltip title="Possible Reasons: Account already exists or mail was not a mail-adress">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    } else return <Typography level="body2">Create a new account:</Typography>;
  };
  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "https://api.smartinies.recipes/signup",
        { email, name, password }
      );
      setShowLogin(true);
      setSignUpSuccess(true);
      setErrorMessage(false);
      //localStorage.setItem("access_token", response.data.access_token);
      // Redirect to the home page or a protected route
    } catch (error) {
      setErrorMessage(true);
      // Handle login error
    }
  };
  return (
    <CssVarsProvider>
      <main>
        <Box>
          <Box marginBottom="10px">
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            {errorMessage ? (
              <Typography level="body2" color="danger">
                Could not create account!
              </Typography>
            ) : (
              <Typography level="body2">Create a new account:</Typography>
            )}
          </Box>
          <Box marginBottom="10px">
            <FormControl>
              <FormLabel>Enter your name</FormLabel>
              <Input
                // html input attribute
                name="name"
                type="name"
                placeholder="Who are you?"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
          </Box>
          <Box marginBottom="10px">
            <FormControl>
              <FormLabel>Enter new Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="New Mail..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Box>
          <FormControl>
            <FormLabel>Enter new Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="New Password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>

          <Button
            sx={{ mt: 3 /* margin top */ }}
            onClick={handleSignin}
            fullWidth
          >
            Join the club!
          </Button>
        </Box>
      </main>
    </CssVarsProvider>
  );
}
