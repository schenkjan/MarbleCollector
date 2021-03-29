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
import { TitleBarAvatarNotificationBadge } from "./TitleBarAvatarNotificationBadge";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarBadge: {
      marginRight: theme.spacing(4),
    },
    avatar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
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
        <TitleBarAvatarNotificationBadge
          className={classes.avatarBadge}
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar
            className={classes.avatar}
            alt={acronym}
            src={props.avatarSrc}
          >
            {acronym.toUpperCase()}
          </Avatar>
        </TitleBarAvatarNotificationBadge>
      ) : (
        <IconButton className={classes.home}>
          <HomeIcon style={{ color: "white" }} />
        </IconButton>
      )}
    </Link>
  );
}
