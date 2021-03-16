import { Avatar, Badge, Box, CardHeader, Typography } from "@material-ui/core";
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
  onTitleClick?: MouseEventHandler<HTMLDivElement>;
  subtitle?: string;
  onSubtitleClick?: MouseEventHandler<HTMLDivElement>;
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
      title={
        <Box onClick={props.onTitleClick}>
          <Typography variant="body2">{props.title}</Typography>
        </Box>
      }
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
      subheader={
        <Box onClick={props.onSubtitleClick}>
          <Typography variant="body2">{props.subtitle}</Typography>
        </Box>
      }
    />
  );
}
