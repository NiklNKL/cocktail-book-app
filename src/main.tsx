import { colors, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { queryClient } from "./queryclient";

const globalTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const theme = createTheme(
  {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
    typography: {
      fontFamily: ["Gloria Hallelujah", "Patrick", "WalterTurncoat"].join(","),
    },
  },
  globalTheme
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
