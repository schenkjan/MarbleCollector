import React from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { LogoutButton } from "../../auth/logout/LogoutButton";
import { LoginButton } from "../../auth/login/LoginButton";
import { TitleBarAvatar } from "./TitleBarAvatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: theme.palette.primary.main,
    },
    title: {
      flexGrow: 1,
      textAlign: "start",
    },
  })
);

type TitleBarProps = {
  avatarSrc: string;
  avatarAlt: string;
  title: string;
  userIsAuthenticated: boolean;
};

export function TitleBar(props: TitleBarProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <TitleBarAvatar
          avatarAlt={props.avatarAlt}
          avatarSrc={props.avatarSrc}
          userIsAuthenticated={props.userIsAuthenticated}
        />
        <Typography className={classes.title} variant="h6">
          {props.title}
        </Typography>
        {props.userIsAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
}
