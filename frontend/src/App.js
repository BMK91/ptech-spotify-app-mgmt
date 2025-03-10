import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Use Routes instead of Switch

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import theme from "./config/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Redirect to login if no route matches */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
        </Routes>{" "}
      </Router>
    </ThemeProvider>
  );
};

export default App;
