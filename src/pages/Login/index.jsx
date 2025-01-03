import styles from "./style.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Alert, Typography } from "@mui/material";

import { Container } from "../../components/Container";
import { login } from "../../services";

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, updateLoginData] = useState({
    username: "",
    password: "",
  });

  const [errorData, setErrorData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    login(loginData)
      .then(() => {
        console.log("Login success");
        navigate("/");
      })
      .catch(({ response }) => {
        const { data } = response;
        data && setErrorData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <article className={styles["root"]}>
      <form className={styles["root__form"]} onSubmit={handleOnSubmit}>
        <Paper variant="outlined" className={styles["root__paper"]}>
          <img
            src="/belvo-wallet.png"
            className={styles["root__logo"]}
            alt="Belvo wallet logo"
          />
          <Typography variant="h6" align="center">
            Welcome back
          </Typography>
          <TextField
            label="Username"
            name="Username"
            size="small"
            value={loginData.username}
            disabled={isLoading}
            onChange={(e) => {
              updateLoginData({ ...loginData, username: e.target.value });
            }}
          />
          <TextField
            label="Password"
            name="Password"
            size="small"
            value={loginData.password}
            type="password"
            disabled={isLoading}
            onChange={(e) => {
              updateLoginData({ ...loginData, password: e.target.value });
            }}
          />
          {errorData && <Alert severity="error">{errorData.detail}</Alert>}
          <Button
            className="button"
            disabled={isLoading}
            type="submit"
            variant="contained"
            disableElevation
          >
            Sing in
            {isLoading && "..."}
          </Button>
        </Paper>
      </form>
    </article>
  );
};
