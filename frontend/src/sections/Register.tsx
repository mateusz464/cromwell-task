import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { CromwellAPI } from "../auth/cromwellAPI.ts";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await CromwellAPI.post("/user/register", {
      name: name,
      email: email,
      password: password,
    });

    if (response.status === 201) {
      dispatch({ type: "LOGIN", payload: response.data.jwt });
      alert("Registered!");
    } else {
      console.error("Registration Failed!");
    }
  };

  function validateEmail() {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
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
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;
