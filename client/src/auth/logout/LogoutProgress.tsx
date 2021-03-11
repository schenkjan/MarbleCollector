import React from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export type LogoutProgressProps = {
  open: boolean;
};

export function LogoutProgress(props: LogoutProgressProps) {
  const classes = useStyles();
  return (
    <>
      <h1>Du wirst ausgeloggt...</h1>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
