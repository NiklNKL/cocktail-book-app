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

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignin = async () => {
    try {
      const response = await axios.post("/signIn", { email, password, name });
      localStorage.setItem("access_token", response.data.access_token);
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
            <Typography level="body2">Create a new account:</Typography>
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
                onChange={(event) => setEmail(event.target.value)}
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
