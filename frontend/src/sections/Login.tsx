import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { CromwellAPI } from "../auth/cromwellAPI.ts";
import { AxiosError } from "axios";
import ResponseData from "../intefaces/ResponseData.ts";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    event.preventDefault();

    try {
      // Login user with the API
      const response = await CromwellAPI.post("/user/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Update Redux state with JWT token
        dispatch({ type: "LOGIN", payload: response.data.jwt });
        alert("Logged in!");
      } else {
        console.error("Login Failed!");
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

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
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
          sx={{ marginBottom: "20px" }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" marginTop="10px">
        Don't have an account? <Link href="/register">Register here</Link>.
      </Typography>
    </Container>
  );
}

export default Login;
