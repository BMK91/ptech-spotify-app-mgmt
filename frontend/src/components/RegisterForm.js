import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import api from "../config/axiosConfig";

// Initial values structure with 'user' object
const initialValues = {
  user: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

// Validation schema using Yup
const validationSchema = Yup.object({
  user: Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
});

const RegisterForm = ({ onTabChange }) => {
  const [error, setError] = useState(""); // State to manage error messages
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to manage Snackbar vis

  const handleSubmit = async (values) => {
    const { name, email, password } = values.user; // Destructure name, email, and password from user object

    try {
      // Make the API request to register the user
      const response = await api
        .post("/user/register", {
          name, // Send name as part of registration data
          email, // Send email
          password, // Send password
        })
        .then(() => {
          onTabChange(null, 0);
        })
        .catch(({ response }) => {
          setError(response?.data?.error); // Set a generic error message or handle specific errors
          setOpenSnackbar(true);
        });
    } catch (err) {
      // Handle errors such as registration failures
      console.error(err);
      setError("Something went wrong, please try again."); // Set a generic error message or handle specific errors
      setOpenSnackbar(true);
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
      {({ isSubmitting, touched, errors }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Name Field */}
            <Field
              as={TextField}
              label="Full Name"
              name="user.name" // Nested name under 'user'
              type="text"
              variant="outlined"
              fullWidth
              error={touched.user?.name && Boolean(errors.user?.name)}
              helperText={touched.user?.name && errors.user?.name}
            />

            {/* Email Field */}
            <Field
              as={TextField}
              label="Email"
              name="user.email" // Nested email under 'user'
              type="email"
              variant="outlined"
              fullWidth
              error={touched.user?.email && Boolean(errors.user?.email)}
              helperText={touched.user?.email && errors.user?.email}
            />

            {/* Password Field */}
            <Field
              as={TextField}
              label="Password"
              name="user.password" // Nested password under 'user'
              type="password"
              variant="outlined"
              fullWidth
              error={touched.user?.password && Boolean(errors.user?.password)}
              helperText={touched.user?.password && errors.user?.password}
            />

            {/* Confirm Password Field */}
            <Field
              as={TextField}
              label="Confirm Password"
              name="user.confirmPassword" // Nested confirmPassword under 'user'
              type="password"
              variant="outlined"
              fullWidth
              error={
                touched.user?.confirmPassword &&
                Boolean(errors.user?.confirmPassword)
              }
              helperText={
                touched.user?.confirmPassword && errors.user?.confirmPassword
              }
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Box>

          {/* Snackbar for displaying error notifications */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000} // Hide after 6 seconds
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={error} // Type of the message (error, success, info, warning)
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

export default RegisterForm;
