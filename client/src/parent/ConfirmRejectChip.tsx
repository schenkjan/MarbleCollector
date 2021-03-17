import { Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import { MouseEventHandler } from "react";

type Prop = {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

export function ConfirmRejectChip(props: Prop): JSX.Element {
  const classes = useStyles();

  return (
    <Chip
      className={classes.chip}
      label="OK"
      color="primary"
      onClick={props.onClick}
    />
  );
}
