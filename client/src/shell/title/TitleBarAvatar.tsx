import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useDashboardBasePath } from "../hooks/DashboardBasePathHook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      marginRight: theme.spacing(4),
    },
    link: {
      textDecoration: "none",
    },
  })
);

type TitleBarAvatarProps = {
  avatarAlt: string;
  avatarSrc: string;
};

export function TitleBarAvatar(props: TitleBarAvatarProps) {
  const classes = useStyles();
  const dashboardBasePath = useDashboardBasePath();
  var matches = props.avatarAlt.match(/\b(\w)/g);
  var acronym = matches?.join("") ?? "?";

  if (props.avatarSrc) {
    return (
      <Link className={classes.link} to={`${dashboardBasePath}/profile`}>
        <Avatar className={classes.avatar} alt={acronym} src={props.avatarSrc}>
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
