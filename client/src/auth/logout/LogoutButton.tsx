import React from "react";
import { IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export function LogoutButton() {
  const history = useHistory();

  function logout() {
    history.push("/auth/logout");
  }

  return (
    <>
      <IconButton aria-label="logout" color="inherit" onClick={logout}>
        <ExitToApp />
      </IconButton>
    </>
  );
}
