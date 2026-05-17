// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

