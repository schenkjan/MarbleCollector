import {
  Avatar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useDashboardBasePath } from "../hooks/DashboardBasePathHook";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      marginRight: theme.spacing(4),
    },
    home: {
      marginRight: theme.spacing(2),
    },
    link: {
      textDecoration: "none",
    },
  })
);

type TitleBarAvatarProps = {
  avatarAlt: string;
  avatarSrc: string;
  userIsAuthenticated: boolean;
};

export function TitleBarAvatar(props: TitleBarAvatarProps) {
  const classes = useStyles();
  const dashboardBasePath = useDashboardBasePath();
  var matches = props.avatarAlt.match(/\b(\w)/g);
  var acronym = matches?.join("") ?? "?";

  const avatarLinkUrl = !props.userIsAuthenticated
    ? "/"
    : `${dashboardBasePath}/profile`;

  return (
    <Link className={classes.link} to={avatarLinkUrl}>
      {props.userIsAuthenticated ? (
        <Avatar className={classes.avatar} alt={acronym} src={props.avatarSrc}>
          {acronym.toUpperCase()}
        </Avatar>
      ) : (
        <IconButton className={classes.home}>
          <HomeIcon style={{ color: "white" }} />
        </IconButton>
      )}
    </Link>
  );
}
