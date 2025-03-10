import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import api from "../config/axiosConfig";

const initialValues = {
  user: {
    email: "mihir@ymail.com",
    password: "mihir123",
  },
};

// Validation schema using Yup
const validationSchema = Yup.object({
  user: Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
});

const LoginForm = () => {
  const [error, setError] = useState(""); // State to manage error messages
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to manage Snackbar vis
  const navigate = useNavigate(); // useNavigate hook for na

  const handleSubmit = async (values) => {
    const { email, password } = values.user; // Destructure email and password from user object
    try {
      // Use the axios instance to submit the login request
      const response = await api.post("/user/login", {
        email, // assuming the API expects username as email
        password,
      });

      // Assuming the response contains a token
      const { token, name } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("loginUser", name);

      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      // Handle any errors (e.g., invalid credentials)
      setError("Invalid credentials, please try again.");
      setOpenSnackbar(true); // Open the error Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar when it's dismissed
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors, resetForm }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Email Field */}
            <Field
              as={TextField}
              label="Email"
              name="user.email" // Update field name to 'user.email'
              type="email"
              variant="outlined"
              fullWidth
              error={touched.user?.email && Boolean(errors.user?.email)} // Adjust error condition for nested object
              helperText={touched.user?.email && errors.user?.email} // Adjust helper text for nested object
            />
            {/* Password Field */}
            <Field
              as={TextField}
              label="Password"
              name="user.password" // Update field name to 'user.password'
              type="password"
              variant="outlined"
              fullWidth
              error={touched.user?.password && Boolean(errors.user?.password)} // Adjust error condition for nested object
              helperText={touched.user?.password && errors.user?.password} // Adjust helper text for nested object
            />
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Box>

          {/* Snackbar for displaying error notifications */}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={6000} // Hide after 6 seconds
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error" // Type of the message (error, success, info, warning)
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
