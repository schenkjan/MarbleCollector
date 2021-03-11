import React from "react";
import {
  AppBar,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { LogoutButton } from "../auth/logout/LogoutButton";
import { useDashboardBasePath } from "./hooks/DashboardBasePathHook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
    },
    avatar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      marginRight: theme.spacing(4),
    },
    link: {
      textDecoration: "none",
    },
    title: {
      flexGrow: 1,
      textAlign: "start",
    },
  })
);

type Prop = {
  avatarSrc: string;
  avatarAlt: string;
  title: string;
};

export function TitleBar(props: Prop) {
  const classes = useStyles();
  const dashboardBasePath = useDashboardBasePath();

  function getAvatar() {
    var matches = props.avatarAlt.match(/\b(\w)/g);
    var acronym = matches?.join("") ?? "?";

    if (props.avatarSrc) {
      return (
        <Link className={classes.link} to={`${dashboardBasePath}/profile`}>
          <Avatar
            className={classes.avatar}
            alt={acronym}
            src={props.avatarSrc}
          >
            {acronym.toUpperCase()}
          </Avatar>
        </Link>
      );
    }

    return (
      <Link className={classes.link} to={`${dashboardBasePath}/profile`}>
        <Avatar className={classes.avatar}>{acronym.toUpperCase()}</Avatar>
      </Link>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {getAvatar()}
        <Typography className={classes.title} variant="h6">
          {props.title}
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
