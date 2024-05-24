import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../utils/token.service";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      if (!body.username.length && !body.password.length) {
        throw new Error("username or password is empty");
      }
      const res = await login(body);
      if (res.status === 200 && res.data) {
        setIsError(false);
        const token = res.data.jwt;
        console.log(token);
        TokenService.setToken("" + token);
        navigate("/");
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={isError}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            error={isError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
