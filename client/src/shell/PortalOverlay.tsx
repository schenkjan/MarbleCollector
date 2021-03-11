import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";
import { CircularProgress } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropdown: {
      position: "fixed",
      width: 60,
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: theme.spacing(1),
    },
  })
);

export default function PortalOverlay() {
  const classes = useStyles();

  const queryCondition = useRecoilValue(AppState.queryState);
  const [open, setOpen] = React.useState(false);

  const overlay = () => {
    if (queryCondition === "error") {
      return <ErrorIcon color="secondary" fontSize="large" />;
    } else {
      return <CircularProgress />;
    }
  };

  if (queryCondition !== "ready" && !open) {
    setOpen((prev) => !prev);
  } else if (queryCondition === "ready" && open) {
    setOpen(false);
  }

  return (
    <div>
      {open ? (
        <Portal>
          <div className={classes.dropdown}>{overlay()}</div>
        </Portal>
      ) : null}
    </div>
  );
}
