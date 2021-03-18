import { Avatar, Badge, CardHeader } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MouseEventHandler } from "react";

type Prop = {
  leftAvatarComponent: JSX.Element;
  rightAvatarLabel: string;
  rightAvatarNotifications: number;
  onRightAvatarClick?: MouseEventHandler<HTMLDivElement>;
  titleComponent: JSX.Element;
  subtitleComponent?: JSX.Element;
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
      avatar={props.leftAvatarComponent}
      title={props.titleComponent}
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
      subheader={props.subtitleComponent ? props.subtitleComponent : null}
    />
  );
}
