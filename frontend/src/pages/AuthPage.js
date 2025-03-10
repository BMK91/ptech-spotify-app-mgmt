import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change and reset form state on tab switch
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">
          Authentication
        </Typography>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box sx={{ display: activeTab === 0 ? "block" : "none" }}>
          <LoginForm />
        </Box>

        <Box sx={{ display: activeTab === 1 ? "block" : "none" }}>
          <RegisterForm onTabChange={handleTabChange} />
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
