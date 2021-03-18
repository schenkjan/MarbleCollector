import { CardHeader } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

type Prop = {
  leftAvatarComponent: JSX.Element;
  rightAvatarComponent: JSX.Element;
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
      action={props.rightAvatarComponent}
      subheader={props.subtitleComponent ? props.subtitleComponent : null}
    />
  );
}
