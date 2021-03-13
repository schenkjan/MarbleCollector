import { CardActions } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { MouseEventHandler } from "react";
import { AddButtonWithLabel } from "./AddButtonWithLabel";

type Prop = {
  hideAddButton?: boolean;
  addLabel: string;
  disabledAddButton?: boolean;
  moreOpen: boolean;
  expandOpen: boolean;
  onAddClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onMoreClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onExpandClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    moreOpen: {
      transform: "rotate(90deg)",
    },
  })
);

export function AddOptionsExpandCardActions(props: Prop): JSX.Element {
  const classes = useStyles();

  return (
    <CardActions>
      {props.hideAddButton ? undefined : (
        <AddButtonWithLabel
          title={props.addLabel}
          onClick={props.onAddClick}
          disabled={props.disabledAddButton}
        />
      )}
      <IconButton
        className={clsx(classes.expand, {
          [classes.moreOpen]: props.moreOpen,
        })}
        onClick={props.onMoreClick}
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: props.expandOpen,
        })}
        onClick={props.onExpandClick}
        aria-expanded={props.expandOpen}
        aria-label="show more"
        size="small"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  );
}
