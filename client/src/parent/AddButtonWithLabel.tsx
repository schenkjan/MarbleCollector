import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { MouseEventHandler } from "react";

type Prop = {
  title?: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function AddButtonWithLabel(props: Prop): JSX.Element {
  return (
    <IconButton size="small" color="primary" onClick={props.onClick}>
      <AddCircleIcon />
      <Typography variant="body2" color="textPrimary">
        {props.title}
      </Typography>
    </IconButton>
  );
}
