import React, { useState } from "react";
import {
  Alert,
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CssBaseline,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { getData, RequestError } from "../utils";
import { authorize } from "../api/API";

interface LoginPageInterface {
  onSuccess: (token: string) => void;
}

interface FormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC<LoginPageInterface> = (props) => {
  const { onSuccess } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit: SubmitHandler<FormValues> = (data) => {
    authorize(data.username, data.password)
      .then((res) => {
        console.log(res);
        const auth = getData(res);
        if ("token" in auth) {
          console.log(auth);
          onSuccess(auth.token);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error instanceof RequestError && error.code == 2004) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("Something was wrong, try again");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Login"
            {...register("username", {
              required: "Login is required",
              pattern: {
                value: /^[a-zA-Z0-9]{2,}$/,
                message:
                  "Login must be at least 2 characters and contain only letters and numbers",
              },
            })}
            autoComplete="email"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
