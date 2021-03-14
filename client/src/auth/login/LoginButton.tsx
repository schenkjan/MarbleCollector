import React from "react";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export function LoginButton() {
  const history = useHistory();

  function login() {
    history.push("/auth");
  }

  return (
    <>
      <Button
        aria-label="Login"
        color="inherit"
        variant="text"
        onClick={login}
        startIcon={<ExitToApp />}
      >
        Login
      </Button>
    </>
  );
}
