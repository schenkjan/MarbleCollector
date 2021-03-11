import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Copyright } from "./Copyright";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export type LoginFormProps = {
  username: string;
  login: (username: string, password: string) => void;
};

export function LoginForm(props: LoginFormProps) {
  const classes = useStyles();

  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState("");

  const disableLoginButton = username.length === 0 || password.length === 0;

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.login(username, password);
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={onFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Benutzername"
          name="username"
          autoComplete="off"
          autoFocus
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Passwort"
          type="password"
          id="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={disableLoginButton}
        >
          Login
        </Button>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
}
