import { Avatar, Badge, CardHeader } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MouseEventHandler } from "react";

type Prop = {
  leftAvatarLabel: string;
  leftAvatarNotifications: number;
  onLeftAvatarClick?: MouseEventHandler<HTMLDivElement>;
  rightAvatarLabel: string;
  rightAvatarNotifications: number;
  onRightAvatarClick?: MouseEventHandler<HTMLDivElement>;
  title: string;
  //onTitleClick?: MouseEventHandler<HTMLDivElement>; // TODO js (11.03.2021): Find a way to provide a onTitleClick event.
  subtitle: string;
  //onSubtitleClick?: MouseEventHandler<HTMLDivElement>; // TODO js (11.03.2021): Find a way to provide a onSubtitleClick event.
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textAlign: "left",
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

export function BiAvatarCardHeader(props: Prop): JSX.Element {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.header}
      avatar={
        <Badge badgeContent={props.leftAvatarNotifications} color="secondary">
          <Avatar className={classes.avatar} onClick={props.onLeftAvatarClick}>
            {props.leftAvatarLabel}
          </Avatar>
        </Badge>
      }
      title={props.title}
      action={
        <Badge
          badgeContent={props.rightAvatarNotifications}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          color="primary"
        >
          <Avatar onClick={props.onRightAvatarClick}>
            {props.rightAvatarLabel}
          </Avatar>
        </Badge>
      }
      subheader={props.subtitle}
    />
  );
}
