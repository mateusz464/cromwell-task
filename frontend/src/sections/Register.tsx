import React, { useState } from "react";
import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { CromwellAPI } from "../auth/cromwellAPI.ts";
import { AxiosError } from "axios";
import ResponseData from "../interfaces/ResponseData.ts";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    event.preventDefault();

    try {
      // Register user with the API
      const response = await CromwellAPI.post("/user/register", {
        name: name,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        // Update Redux state with JWT token
        dispatch({ type: "LOGIN", payload: response.data.jwt });
        // Redirect to profile page
        navigate("/profile");
      } else {
        console.error("Registration Failed!");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response.data as ResponseData;
        console.error(responseData.message);
        alert(responseData.message);
      }
    }
  };

  function validateEmail() {
    // Email validation regex
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  }

  function validatePassword() {
    // Password validation regex
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (email.trim() !== "") {
              const isValid = validateEmail();
              if (!isValid) {
                setEmailError("Invalid email address");
              } else {
                setEmailError("");
              }
            }
          }}
          helperText={emailError}
          error={!!emailError}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            if (password.trim() !== "") {
              const isValid = validatePassword();
              if (!isValid) {
                setPasswordError(
                  "Password must be at least 8 characters long and contain at least 1 number and 1 special character",
                );
              } else {
                setPasswordError("");
              }
            }
          }}
          helperText={passwordError}
          error={!!passwordError}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => {
            if (confirmPassword.trim() !== "") {
              if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
              } else {
                setConfirmPasswordError("");
              }
            }
          }}
          helperText={confirmPasswordError}
          error={!!confirmPasswordError}
          sx={{ marginBottom: "20px" }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" marginTop="10px">
        Already have an account? <Link href="/login">Sign in</Link>.
      </Typography>
    </Container>
  );
}

export default Register;
