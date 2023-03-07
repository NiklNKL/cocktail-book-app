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

// export interface Credentials {
//   email: string;
//   password: string;
// }

// async function loginUser({ email, password }: Credentials) {
//   return fetch("https://api.smartinies.recipes/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({email, password}),
//   }).then((data) => data.json());
// }

export default function LogInPage({ setToken }: { setToken: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api.smartinies.recipes/login",
        { email, password }
      );
      localStorage.setItem("access_token", response.data.access_token);
      setToken(response.data.access_token);
      console.log(response);

      // Redirect to the home page or a protected route
    } catch (error) {
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
            <Typography level="body2">Log in to continue.</Typography>
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
