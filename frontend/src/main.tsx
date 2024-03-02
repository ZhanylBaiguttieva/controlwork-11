import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from "../theme.ts";
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <App />
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
