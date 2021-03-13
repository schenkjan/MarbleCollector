import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Portal from "@material-ui/core/Portal";
import { CircularProgress } from "@material-ui/core";
import { useRecoilValue } from "recoil";
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

  const queryState = useRecoilValue(AppState.queryStateInfo);

  const overlayVariant = (value: string) => {
    if (value === "error") {
      return <ErrorIcon color="secondary" fontSize="large" />;
    } else {
      return <CircularProgress />;
    }
  };

  return (
    <div>
      {queryState.open ? (
        <Portal>
          <div className={classes.dropdown}>
            {overlayVariant(queryState.variant)}
          </div>
        </Portal>
      ) : null}
    </div>
  );
}
