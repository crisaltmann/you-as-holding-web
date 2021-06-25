import React, { useState } from "react";
import {
  Card,
  Input,
  FormLabel,
  makeStyles,
  CardContent,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";

import { login as apiLogin } from "../../api/login";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  formControl: {
    width: "50%",
    paddingTop: 24,
  },
  wrapper: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(1, 93, 164, 0.5)",
  },
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  buttonMargin: {
    marginTop: 24,
    width: "25%",
  },
  title: {
    textTransform: "uppercase",
  },
}));

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const login = async () => {
    try {
      const { id_usuario, token } = await apiLogin({ email, password });
      localStorage.setItem("id_usuario", `${id_usuario}`);
      localStorage.setItem("token", `${token}`);

      history.push("/");
    } catch (e) {
      toast.error("Ocorreu um erro ao fazer login.");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography color='primary' className={classes.title} variant='h6'>
            You as a holding
          </Typography>
          <FormControl className={classes.formControl}>
            <FormLabel>Usuário</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel>Senha</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            size='medium'
            className={classes.buttonMargin}
            variant='contained'
            color='primary'
            onClick={login}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
