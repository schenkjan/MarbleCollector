import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Portal from "@material-ui/core/Portal";
import { CircularProgress } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";

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

//if the actuell request of react-query in loading or error, we noticed that here
export default function PortalOverlay() {
  const classes = useStyles();

  const queryState = useRecoilValue(AppState.queryStateInfo);

  //shows overlayd on top of the actuell screen, a loadingcirle or errorMessage,
  return (
    <div>
      {queryState.open ? (
        <Portal>
          <div className={classes.dropdown}>
            <CircularProgress />
          </div>
        </Portal>
      ) : null}
    </div>
  );
}
