import { Avatar, Badge, CardHeader } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MouseEventHandler } from "react";
import { EditableText } from "./EditableText";

type Prop = {
  leftAvatarLabel: string;
  leftAvatarNotifications: number;
  onLeftAvatarClick?: MouseEventHandler<HTMLDivElement>;
  rightAvatarLabel: string;
  rightAvatarNotifications: number;
  onRightAvatarClick?: MouseEventHandler<HTMLDivElement>;
  title: string;
  onTitleChanged?: (newText: string) => void;
  subtitle?: string;
  onSubtitleChanged?: (newText: string) => void;
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
        <EditableText text={props.title} onTextChanged={props.onTitleChanged} />
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
        props.subtitle ? (
          <EditableText
            text={props.subtitle}
            onTextChanged={props.onSubtitleChanged}
          />
        ) : null
      }
    />
  );
}
